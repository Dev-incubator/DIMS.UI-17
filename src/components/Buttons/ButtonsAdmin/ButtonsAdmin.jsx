import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { removeUserData } from '../../../services/auth-services';
import { Button } from '../Button/Button';
import { BUTTONS_NAMES, BUTTONS_TYPES } from '../../../shared/constants';
import { DeleteModal } from '../../Common/Modal/DeleteModal/DeleteModal';
import { Modal } from '../../Common/Modal/Modal';
import { getAllUsers, getUserData } from '../../../services/users-services ';
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

  deleteUser = async () => {
    const { id, handleSetUsers } = this.props;
    removeUserData(id);
    const users = await getAllUsers();
    handleSetUsers(users);
  };

  toggleModalEdit = () => {
    this.setState((prevState) => ({ isEditModalOpen: !prevState.isEditModalOpen }));
  };

  toggleModalDelete = () => {
    this.setState((prevState) => ({ isDeleteModalOpen: !prevState.isDeleteModalOpen }));
  };

  showUserData = async () => {
    await this.getUserData();
    this.toggleModalEdit();
  };

  render() {
    const { id } = this.props;
    const { isDeleteModalOpen, isEditModalOpen, userData } = this.state;

    return (
      <>
        <NavLink to={`/tasks/${id}`}>
          <Button title={BUTTONS_NAMES.tasks} />
        </NavLink>
        <NavLink to={`/progress/${id}`}>
          <Button title={BUTTONS_NAMES.progress} />
        </NavLink>

        <Button title={BUTTONS_NAMES.edit} stylingType={BUTTONS_TYPES.typeEdit} onClick={this.showUserData} />
        <Button title={BUTTONS_NAMES.delete} stylingType={BUTTONS_TYPES.typeDelete} onClick={this.toggleModalDelete} />
        {isDeleteModalOpen && (
          <Modal title='Delete member' isModalOpen={isDeleteModalOpen} handleToggleModal={this.toggleModalDelete}>
            <DeleteModal item='member' handleDeleteUser={this.deleteUser} handleToggleModal={this.toggleModalDelete} />
          </Modal>
        )}
        {isEditModalOpen && (
          <Modal title='User data' isModalOpen={isEditModalOpen} handleToggleModal={this.toggleModalEdit}>
            <CreateMemberModal userData={userData} handleToggleModal={this.toggleModalEdit} />
          </Modal>
        )}
      </>
    );
  }
}

ButtonsAdminMemberPage.propTypes = {
  id: PropTypes.string,
  handleSetUsers: PropTypes.func.isRequired,
};

ButtonsAdminMemberPage.defaultProps = {
  id: '0',
};
