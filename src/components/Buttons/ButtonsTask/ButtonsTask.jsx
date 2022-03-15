import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '../Button/Button';
import { BUTTONS_NAMES, BUTTONS_TYPES } from '../../../shared/constants';
import { getTaskData, removeTask } from '../../../services/other-services';
import { getAllTasks } from '../../../services/tasks-services';
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

  deleteTask = async () => {
    const { id, handleSetTasks } = this.props;
    await removeTask(id);
    const tasks = await getAllTasks();
    handleSetTasks(tasks);
    this.toggleModalDelete();
  };

  toggleModalEdit = () => {
    this.setState((prevState) => ({ isEditModalOpen: !prevState.isEditModalOpen }));
  };

  toggleModalDelete = () => {
    this.setState((prevState) => ({ isDeleteModalOpen: !prevState.isDeleteModalOpen }));
  };

  showTaskData = async () => {
    await this.getTasksData();
    this.toggleModalEdit();
  };

  render() {
    const { isDeleteModalOpen, isEditModalOpen, taskData, allUsers } = this.state;
    const { id, handleSetTasks } = this.props;

    return (
      <>
        <Button title={BUTTONS_NAMES.edit} stylingType={BUTTONS_TYPES.typeEdit} onClick={this.showTaskData} />
        <Button title={BUTTONS_NAMES.delete} stylingType={BUTTONS_TYPES.typeDelete} onClick={this.toggleModalDelete} />

        {isDeleteModalOpen && (
          <Modal title='Delete task' isModalOpen={isDeleteModalOpen} handleToggleModal={this.toggleModalDelete}>
            <DeleteModal item='task' handleDelete={this.deleteTask} handleToggleModal={this.toggleModalDelete} />
          </Modal>
        )}
        {isEditModalOpen && (
          <Modal title='Task data' isModalOpen={isEditModalOpen} handleToggleModal={this.toggleModalEdit}>
            <CreateTaskModal
              isEditMode
              users={allUsers}
              taskData={taskData}
              id={id}
              handleToggleModal={this.toggleModalEdit}
              handleSetTasks={handleSetTasks}
            />
          </Modal>
        )}
      </>
    );
  }
}

ButtonsTask.propTypes = {
  id: PropTypes.string.isRequired,
  handleSetTasks: PropTypes.func.isRequired,
};
