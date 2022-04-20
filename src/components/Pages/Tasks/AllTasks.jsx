import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { TABLE_TITLES, TITLES_PAGES, BUTTONS_NAMES, LINKPATH_KEYS, MODALTITLE_KEYS } from '../../../shared/constants';
import { PageTitle } from '../../PageTitle/PageTitle';
import { ModalWindow } from '../../Common/Modal/Modal';
import { ButtonsTask } from '../../Buttons/ButtonsTask/ButtonsTask';
import { CreateTaskForm } from '../../Forms/CreateTaskForm/CreateTaskForm';
import { Table } from '../../Table/Table';
import { AllTasksTableRow } from '../../Table/AllTasksTableRow';
import { DeleteForm } from '../../Forms/DeleteForm/DeleteForm';
import {
  createTaskThunk,
  editTaskThunk,
  getTasksThunk,
  getTaskThunk,
  removeTaskThunk,
} from '../../../store/actionCreators/tasksActionCreators';
import { getUsersThunk } from '../../../store/actionCreators/usersActionCreators';

class AllTasks extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      selectedTaskId: null,
      isTaskModalOpen: false,
      isDeleteModalOpen: false,
      isEditMode: false,
    };
  }

  async componentDidMount() {
    await this.getData();
  }

  async componentDidUpdate(prevProps) {
    const { tasks } = this.props;

    if (prevProps.tasks !== tasks) {
      this.toggleModal();
    }
  }

  async getData() {
    const { getTasks, getUsers } = this.props;
    await getTasks();
    await getUsers();
  }

  async getTaskData() {
    const { selectedTaskId } = this.state;
    const { getTask } = this.props;
    await getTask(selectedTaskId);
  }

  createTaskHandler = async (data) => {
    const { createTask } = this.props;
    await createTask(data);
  };

  updateTaskHandler = async (data) => {
    const { selectedTaskId } = this.state;
    const { editTasks } = this.props;

    await editTasks(selectedTaskId, data);
  };

  deleteTaskHandler = async () => {
    const { selectedTaskId } = this.state;
    const { removeTask } = this.props;

    await removeTask(selectedTaskId);
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

  toggleModal = () => {
    const { isTaskModalOpen, isDeleteModalOpen } = this.state;
    if (isTaskModalOpen) {
      this.toggleTaskModalHandler();
    } else if (isDeleteModalOpen) {
      this.toggleModalDeleteHandler();
    }
  };

  render() {
    const { isTaskModalOpen, isDeleteModalOpen, selectedTaskId, isEditMode } = this.state;
    const { tasks, users, taskData } = this.props;
    const items = tasks.map((item, index) => {
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
              showTaskDataHandler={this.showTaskDataHandler}
              selectUserHandler={this.selectTaskHandler}
              toggleTaskModalHandler={this.toggleTaskModalHandler}
              id={item.id}
            />
          }
        />
      );
    });

    return (
      <>
        <PageTitle
          title={TITLES_PAGES.allTasks}
          buttonTitle={BUTTONS_NAMES.create}
          onClick={this.toggleTaskModalHandler}
        />

        <Table title={TABLE_TITLES.allTasks} items={items} />

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

const mapStateToProps = (state) => {
  return {
    tasks: state.tasks.tasks,
    users: state.users.users,
    taskData: state.tasks.taskData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      getTasks: getTasksThunk,
      getUsers: getUsersThunk,
      removeTask: removeTaskThunk,
      createTask: createTaskThunk,
      editTasks: editTaskThunk,
      getTask: getTaskThunk,
    },
    dispatch,
  );
};

AllTasks.propTypes = {
  getUsers: propTypes.func.isRequired,
  getTasks: propTypes.func.isRequired,
  removeTask: propTypes.func.isRequired,
  createTask: propTypes.func.isRequired,
  editTasks: propTypes.func.isRequired,
  getTask: propTypes.func.isRequired,
  tasks: propTypes.arrayOf(propTypes.object).isRequired,
  users: propTypes.arrayOf(propTypes.object).isRequired,
  taskData: propTypes.oneOfType([propTypes.object, propTypes.string]),
};

AllTasks.defaultProps = {
  taskData: null,
};

export default connect(mapStateToProps, mapDispatchToProps)(AllTasks);
