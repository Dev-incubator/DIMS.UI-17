import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { Button } from '../Button/Button';
import { BUTTONS_NAMES, BUTTONS_TYPES } from '../../../shared/constants';
import { DeleteModal } from '../../Common/Modal/DeleteModal/DeleteModal';
import { Modal } from '../../Common/Modal/Modal';
import { getAllUsers, getUserData, removeUserData } from '../../../services/users-services ';
import { CreateMemberModal } from '../../Common/Modal/CreateMemberModal/CreateMemberModal';

export class ButtonsAdminMemberPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDeleteModalOpen: false,
      isEditModalOpen: false,
      userData: {},
    };
  }

  async getUserData() {
    const { id } = this.props;
    const userData = await getUserData(id);
    this.setState({ userData });
  }

  deleteUserHandler = async () => {
    const { id, setUsersHandler } = this.props;
    removeUserData(id);
    const users = await getAllUsers();
    await setUsersHandler(users);
    this.toggleModalDeleteHandler();
  };

  toggleModalEditHandler = () => {
    this.setState((prevState) => ({ isEditModalOpen: !prevState.isEditModalOpen }));
  };

  toggleModalDeleteHandler = () => {
    this.setState((prevState) => ({ isDeleteModalOpen: !prevState.isDeleteModalOpen }));
  };

  showUserDataHandler = async () => {
    await this.getUserData();
    this.toggleModalEditHandler();
  };

  render() {
    const { id, setUsersHandler } = this.props;
    const { isDeleteModalOpen, isEditModalOpen, userData } = this.state;

    return (
      <>
        <NavLink to={`/tasks/${id}`}>
          <Button title={BUTTONS_NAMES.tasks} />
        </NavLink>
        <NavLink to={`/progress/${id}`}>
          <Button title={BUTTONS_NAMES.progress} />
        </NavLink>

        <Button title={BUTTONS_NAMES.edit} stylingType={BUTTONS_TYPES.typeEdit} onClick={this.showUserDataHandler} />
        <Button
          title={BUTTONS_NAMES.delete}
          stylingType={BUTTONS_TYPES.typeDelete}
          onClick={this.toggleModalDeleteHandler}
        />
        {isDeleteModalOpen && (
          <Modal
            title='Delete member'
            isModalOpen={isDeleteModalOpen}
            toggleModalHandler={this.toggleModalDeleteHandler}
          >
            <DeleteModal
              item='member'
              deleteHandler={this.deleteUserHandler}
              toggleModalHandler={this.toggleModalDeleteHandler}
            />
          </Modal>
        )}
        {isEditModalOpen && (
          <Modal title='User data' isModalOpen={isEditModalOpen} toggleModalHandler={this.toggleModalEditHandler}>
            <CreateMemberModal
              isEditMode
              id={id}
              userData={userData}
              toggleModalHandler={this.toggleModalEditHandler}
              setUsersHandler={setUsersHandler}
            />
          </Modal>
        )}
      </>
    );
  }
}

ButtonsAdminMemberPage.propTypes = {
  id: PropTypes.string,
  setUsersHandler: PropTypes.func.isRequired,
};

ButtonsAdminMemberPage.defaultProps = {
  id: '0',
};
