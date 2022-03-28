import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '../Button/Button';
import { BUTTONS_NAMES, BUTTONS_TYPES } from '../../../shared/constants';
import { getTaskData, removeTask, getAllTasks } from '../../../services/tasks-services';
import { DeleteForm } from '../../Forms/DeleteForm/DeleteForm';
import { Modal } from '../../Common/Modal/Modal';
import { getAllUsers } from '../../../services/users-services ';
import { CreateTaskForm } from '../../Forms/CreateTaskForm/CreateTaskForm';

export class ButtonsTask extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDeleteModalOpen: false,
      isEditModalOpen: false,
      taskData: {},
      allUsers: [],
    };
  }

  async componentDidMount() {
    const allUsers = await getAllUsers();
    if (allUsers) {
      this.setState({ allUsers });
    } else {
      this.toggleError();
    }
  }

  async getTasksData() {
    const { id, toggleError } = this.props;
    const taskData = await getTaskData(id);
    if (taskData) {
      this.setState({ taskData });
    } else {
      toggleError();
    }
  }

  deleteTaskHandler = async () => {
    const { id, setTasksHandler, toggleError } = this.props;
    const isDeleted = await removeTask(id);
    if (isDeleted) {
      const tasks = await getAllTasks();
      setTasksHandler(tasks);
      this.toggleModalDeleteHandler();
    } else {
      toggleError();
    }
  };

  toggleModalEditHandler = () => {
    this.setState((prevState) => ({ isEditModalOpen: !prevState.isEditModalOpen }));
  };

  toggleModalDeleteHandler = () => {
    this.setState((prevState) => ({ isDeleteModalOpen: !prevState.isDeleteModalOpen }));
  };

  showTaskDataHandler = async () => {
    await this.getTasksData();
    this.toggleModalEditHandler();
  };

  render() {
    const { isDeleteModalOpen, isEditModalOpen, taskData, allUsers } = this.state;
    const { id, setTasksHandler, toggleError } = this.props;

    return (
      <>
        <Button title={BUTTONS_NAMES.edit} stylingType={BUTTONS_TYPES.typeEdit} onClick={this.showTaskDataHandler} />
        <Button
          title={BUTTONS_NAMES.delete}
          stylingType={BUTTONS_TYPES.typeDelete}
          onClick={this.toggleModalDeleteHandler}
        />

        {isDeleteModalOpen && (
          <Modal title='Delete task' isModalOpen={isDeleteModalOpen} toggleModalHandler={this.toggleModalDeleteHandler}>
            <DeleteForm
              toggleError={toggleError}
              item='task'
              deleteHandler={this.deleteTaskHandler}
              toggleModalHandler={this.toggleModalDeleteHandler}
            />
          </Modal>
        )}
        {isEditModalOpen && (
          <Modal title='Task data' isModalOpen={isEditModalOpen} toggleModalHandler={this.toggleModalEditHandler}>
            <CreateTaskForm
              toggleError={toggleError}
              isEditMode
              users={allUsers}
              taskData={taskData}
              id={id}
              toggleModalHandler={this.toggleModalEditHandler}
              setTasksHandler={setTasksHandler}
            />
          </Modal>
        )}
      </>
    );
  }
}

ButtonsTask.propTypes = {
  toggleError: PropTypes.func.isRequired,
  id: PropTypes.string,
  setTasksHandler: PropTypes.func.isRequired,
};
ButtonsTask.defaultProps = {
  id: '0',
};
