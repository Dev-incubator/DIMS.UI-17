import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '../Button/Button';
import { BUTTONS_NAMES, BUTTONS_TYPES } from '../../../shared/constants';
import { getTaskData, removeTask, getAllTasks } from '../../../services/tasks-services';
import { CreateTaskModal } from '../../Common/Modal/CreateTaskModal/CreateTaskModal';
import { DeleteModal } from '../../Common/Modal/DeleteModal/DeleteModal';
import { Modal } from '../../Common/Modal/Modal';
import { getAllUsers } from '../../../services/users-services ';

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
    this.setState({ allUsers });
  }

  async getTasksData() {
    const { id } = this.props;
    const taskData = await getTaskData(id);
    this.setState({ taskData });
  }

  deleteTaskHandler = async () => {
    const { id, setTasksHandler } = this.props;
    await removeTask(id);
    const tasks = await getAllTasks();
    setTasksHandler(tasks);
    this.toggleModalDeleteHandler();
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
    const { id, setTasksHandler } = this.props;

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
            <DeleteModal
              item='task'
              deleteHandler={this.deleteTaskHandler}
              toggleModalHandler={this.toggleModalDeleteHandler}
            />
          </Modal>
        )}
        {isEditModalOpen && (
          <Modal title='Task data' isModalOpen={isEditModalOpen} toggleModalHandler={this.toggleModalEditHandler}>
            <CreateTaskModal
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
  id: PropTypes.string,
  setTasksHandler: PropTypes.func.isRequired,
};
ButtonsTask.defaultProps = {
  id: '0',
};
