import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { Button } from '../Button/Button';
import { BUTTONS_NAMES, BUTTONS_TYPES } from '../../../shared/constants';
import { DeleteForm } from '../../Forms/DeleteForm/DeleteForm';
import { Modal } from '../../Common/Modal/Modal';
import { getAllUsers, getUserData, removeUserData } from '../../../services/users-services ';
import noop from '../../../shared/noop';
import style from './ButtonsAdmin.module.css';
import { CreateMemberForm } from '../../Forms/CreateMemberForm/CreateMemberForm';

export class ButtonsAdminMemberPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDeleteModalOpen: false,
      isEditModalOpen: false,
      userData: {},
      readMode: false,
    };
  }

  componentDidMount() {
    const { readMode } = this.props;
    if (readMode) {
      this.setState({ readMode });
    }
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
    const { id, setUsersHandler, userName } = this.props;
    const { isDeleteModalOpen, isEditModalOpen, userData, readMode } = this.state;

    return readMode ? (
      <>
        <div className={style.name} role='none' onClick={this.showUserDataHandler}>
          {userName}
        </div>
        {isEditModalOpen && (
          <Modal title='User data' isModalOpen={isEditModalOpen} toggleModalHandler={this.toggleModalEditHandler}>
            <CreateMemberForm
              isReadOnlyMode
              isEditMode
              id={id}
              userData={userData}
              toggleModalHandler={this.toggleModalEditHandler}
              setUsersHandler={setUsersHandler}
            />
          </Modal>
        )}
      </>
    ) : (
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
            <DeleteForm
              item='member'
              deleteHandler={this.deleteUserHandler}
              toggleModalHandler={this.toggleModalDeleteHandler}
            />
          </Modal>
        )}
        {isEditModalOpen && (
          <Modal title='User data' isModalOpen={isEditModalOpen} toggleModalHandler={this.toggleModalEditHandler}>
            <CreateMemberForm
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
  setUsersHandler: PropTypes.func,
  readMode: PropTypes.bool,
  userName: PropTypes.string,
};

ButtonsAdminMemberPage.defaultProps = {
  id: '0',
  setUsersHandler: noop,
  readMode: false,
  userName: 'name',
};
