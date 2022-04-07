import React from 'react';
import { Table } from 'react-bootstrap';
import { TABLE_TITLES, TITLES_PAGES, BUTTONS_NAMES, LINKPATH_KEYS, MODALTITLE_KEYS } from '../../../shared/constants';
import { PageTitle } from '../../PageTitle/PageTitle';
import { createTask, getAllTasks, removeTask, updateTask, getTaskData } from '../../../services/tasks-services';
import { ModalWindow } from '../../Common/Modal/Modal';
import { ButtonsTask } from '../../Buttons/ButtonsTask/ButtonsTask';
import { getAllUsers } from '../../../services/users-services ';
import { CreateTaskForm } from '../../Forms/CreateTaskForm/CreateTaskForm';
import { TableHead } from '../../Table/TableHead';
import { AllTasksTableRow } from '../../Table/AllTasksTableRow';
import { DeleteForm } from '../../Forms/DeleteForm/DeleteForm';
import { compareObjects } from '../../../shared/helpers/compareObjects/compareObjects';

export class AllTasks extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      users: [],
      taskData: null,
      selectedTaskId: null,
      isTaskModalOpen: false,
      isDeleteModalOpen: false,
      isEditMode: false,
    };
  }

  async componentDidMount() {
    await this.getData();
  }

  async componentDidUpdate(prevProps, prevState) {
    const { tasks, selectedTaskId } = this.state;

    if (prevState.tasks.length > tasks.length && prevState.tasks.length) {
      await this.getData();
      this.toggleModalDeleteHandler();

      return;
    }
    if (prevState.tasks.length < tasks.length && prevState.tasks.length) {
      await this.getData();
      this.toggleTaskModalHandler();

      return;
    }
    if (
      !compareObjects(
        prevState.tasks.find((item) => item.id === selectedTaskId),
        tasks.find((item) => item.id === selectedTaskId),
      )
    ) {
      await this.getData();
      this.toggleTaskModalHandler();
    }
  }

  async getData() {
    const tasks = await getAllTasks();
    const users = await getAllUsers();
    this.setState({ tasks, users });
  }

  setTasksHandler = (tasks) => {
    this.setState({ tasks });
  };

  async getTaskData() {
    const { selectedTaskId } = this.state;
    const taskData = await getTaskData(selectedTaskId);
    this.setState({ taskData });
  }

  createTaskHandler = async (data) => {
    const { tasks } = this.state;
    const updatedTasks = [...tasks, data];

    await createTask(data);
    this.setState({ tasks: updatedTasks });
  };

  updateTaskHandler = async (data) => {
    const { selectedTaskId, tasks } = this.state;
    const updatedTasks = tasks.map((item) => (item.id === selectedTaskId ? { ...data, id: selectedTaskId } : item));

    await updateTask(selectedTaskId, data);
    this.setState({ tasks: updatedTasks });
  };

  deleteTaskHandler = async () => {
    const { selectedTaskId, tasks } = this.state;
    const updatedTasks = tasks.filter((item) => item.id !== selectedTaskId);

    await removeTask(selectedTaskId);
    this.setState({ tasks: updatedTasks });
  };

  selectTaskHandler = (selectedTaskId) => {
    this.setState({ selectedTaskId });
  };

  showTaskDataHandler = async () => {
    await this.getTaskData();
    this.setState({ isEditMode: true });
  };

  toggleTaskModalHandler = () => {
    this.setState((prevState) => {
      const { isTaskModalOpen } = this.state;

      return isTaskModalOpen
        ? {
            ...prevState,
            isTaskModalOpen: !prevState.isTaskModalOpen,
            selectedTaskId: null,
            isEditMode: false,
          }
        : { ...prevState, isTaskModalOpen: !prevState.isTaskModalOpen };
    });
  };

  toggleModalDeleteHandler = () => {
    this.setState((prevState) => {
      const { isDeleteModalOpen } = prevState;

      return isDeleteModalOpen
        ? { selectedTaskId: null, isDeleteModalOpen: !prevState.isDeleteModalOpen }
        : { isDeleteModalOpen: !prevState.isDeleteModalOpen };
    });
  };

  render() {
    const { tasks, users, isTaskModalOpen, isDeleteModalOpen, selectedTaskId, isEditMode, taskData } = this.state;

    return (
      <>
        <PageTitle
          title={TITLES_PAGES.allTasks}
          buttonTitle={BUTTONS_NAMES.create}
          onClick={this.toggleTaskModalHandler}
        />

        <Table striped bordered hover>
          <TableHead items={TABLE_TITLES.allTasks} />
          {tasks.map((item, index) => {
            return (
              <AllTasksTableRow
                key={item.name + index.toString()}
                index={index}
                name={item.name}
                description={item.description}
                startDate={item.startDate}
                deadlineDate={item.deadlineDate}
                id={item.id}
                linkPath={LINKPATH_KEYS.tasks}
                action={
                  <ButtonsTask
                    selectTaskHandler={this.selectTaskHandler}
                    toggleModalDeleteHandler={this.toggleModalDeleteHandler}
                    toggleError={this.toggleError}
                    setTasksHandler={this.setTasksHandler}
                    showTaskDataHandler={this.showTaskDataHandler}
                    selectUserHandler={this.selectTaskHandler}
                    toggleTaskModalHandler={this.toggleTaskModalHandler}
                    id={item.id}
                  />
                }
              />
            );
          })}
        </Table>

        {isTaskModalOpen ? (
          <ModalWindow
            title={MODALTITLE_KEYS.createTask}
            isModalOpen={isTaskModalOpen}
            toggleModalHandler={this.toggleTaskModalHandler}
          >
            <CreateTaskForm
              toggleError={this.toggleError}
              users={users}
              toggleModalHandler={this.toggleTaskModalHandler}
              setTasksHandler={this.setTasksHandler}
              isEditMode={isEditMode}
              taskData={taskData}
              id={selectedTaskId}
              createTaskHandler={this.createTaskHandler}
              updateTaskHandler={this.updateTaskHandler}
            />
          </ModalWindow>
        ) : null}

        {isDeleteModalOpen && (
          <ModalWindow
            title='Delete task'
            isModalOpen={isDeleteModalOpen}
            toggleModalHandler={this.toggleModalDeleteHandler}
          >
            <DeleteForm
              item='task'
              deleteHandler={this.deleteTaskHandler}
              toggleModalHandler={this.toggleModalDeleteHandler}
            />
          </ModalWindow>
        )}
      </>
    );
  }
}
