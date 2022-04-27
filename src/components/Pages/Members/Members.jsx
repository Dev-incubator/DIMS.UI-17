import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import {
  createUserThunk,
  editUserThunk,
  getUsersThunk,
  removeUserThunk,
  setUserDataThunk,
} from '../../../store/actionCreators/usersActionCreators';
import { loading } from '../../../store/actionCreators/loadingActionCreators';
import { PageTitle } from '../../PageTitle/PageTitle';
import { TABLE_TITLES, TITLES_PAGES, BUTTONS_NAMES, MODALTITLE_KEYS } from '../../../shared/constants';
import { ModalWindow } from '../../Common/Modal/Modal';
import { ButtonsAdminMemberPage } from '../../Buttons/ButtonsAdmin/ButtonsAdmin';
import { CreateMemberForm } from '../../Forms/CreateMemberForm/CreateMemberForm';
import { DeleteForm } from '../../Forms/DeleteForm/DeleteForm';
import { MembersTableRow } from '../../Table/MembersTableRow';
import { Table } from '../../Table/Table';

class Members extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      selectedUserId: null,
      isUserModalOpen: false,
      isDeleteModalOpen: false,
      isEditMode: false,
      isReadOnlyMode: false,
    };
  }

  async componentDidMount() {
    await this.getUsers();
  }

  async getUserData() {
    const { selectedUserId } = this.state;
    const { setUserData } = this.props;
    await setUserData(selectedUserId);
  }

  getUsers = async () => {
    const { getUsers, toggleLoading } = this.props;
    toggleLoading(true);
    await getUsers();
    toggleLoading(false);
  };

  deleteUserHandler = async () => {
    const { selectedUserId } = this.state;
    const { removeUser, toggleLoading } = this.props;
    toggleLoading(true);
    await removeUser(selectedUserId);
    toggleLoading(false);
    this.toggleModal();
  };

  createUserHandler = async (userData) => {
    const { createUser, toggleLoading } = this.props;
    toggleLoading(true);
    await createUser(userData);
    toggleLoading(false);
    this.toggleModal();
  };

  editUserDataHandler = async (userData) => {
    const { selectedUserId } = this.state;
    const { editUser, toggleLoading } = this.props;
    toggleLoading(true);
    await editUser(selectedUserId, userData);
    toggleLoading(false);
    this.toggleModal();
  };

  selectUserHandler = async (selectedUserId) => {
    this.setState({ selectedUserId });
  };

  showUserDataHandler = async (isReadOnlyMode = false) => {
    await this.getUserData();
    this.setState({ isEditMode: true, isReadOnlyMode });
  };

  toggleUserModalHandler = () => {
    this.setState((prevState) => {
      const { isUserModalOpen } = this.state;

      if (isUserModalOpen) {
        return {
          ...prevState,
          isUserModalOpen: !prevState.isUserModalOpen,
          selectedUserId: null,
          isEditMode: false,
          isReadOnlyMode: false,
        };
      }

      return { ...prevState, isUserModalOpen: !prevState.isUserModalOpen };
    });
  };

  toggleModalDeleteHandler = () => {
    this.setState((prevState) => {
      const { isDeleteModalOpen } = prevState;

      return isDeleteModalOpen
        ? { selectedUserId: null, isDeleteModalOpen: !prevState.isDeleteModalOpen }
        : { isDeleteModalOpen: !prevState.isDeleteModalOpen };
    });
  };

  toggleModal = () => {
    const { isUserModalOpen, isDeleteModalOpen } = this.state;
    if (isUserModalOpen) {
      this.toggleUserModalHandler();
    } else if (isDeleteModalOpen) {
      this.toggleModalDeleteHandler();
    }
  };

  render() {
    const { isUserModalOpen, isDeleteModalOpen, isEditMode, isReadOnlyMode, selectedUserId } = this.state;
    const { users } = this.props;
    const userData = users.find((user) => user.userId === selectedUserId);

    const items = users.map((user, index) => {
      const showReadOnlyModal = async () => {
        await this.selectUserHandler(user.userId);
        await this.showUserDataHandler(true);
        this.toggleUserModalHandler();
      };

      return (
        <MembersTableRow
          key={user.name + index.toString()}
          index={index}
          firstName={user.firstName}
          lastName={user.lastName}
          directionName={user.directionName}
          education={user.education}
          startDate={user.startDate}
          birthDate={user.birthDate}
          action={
            <ButtonsAdminMemberPage
              selectUserHandler={this.selectUserHandler}
              showUserDataHandler={this.showUserDataHandler}
              toggleModalDeleteHandler={this.toggleModalDeleteHandler}
              toggleUserModalHandler={this.toggleUserModalHandler}
              id={user.userId}
            />
          }
          showReadOnlyModal={showReadOnlyModal}
        />
      );
    });

    return (
      <>
        <PageTitle
          title={TITLES_PAGES.members}
          buttonTitle={BUTTONS_NAMES.create}
          onClick={this.toggleUserModalHandler}
        />

        <Table title={TABLE_TITLES.members} items={items} />

        {isUserModalOpen ? (
          <ModalWindow
            title={MODALTITLE_KEYS.createMember}
            isModalOpen={isUserModalOpen}
            toggleModalHandler={this.toggleUserModalHandler}
          >
            <CreateMemberForm
              toggleModalHandler={this.toggleUserModalHandler}
              createUserHandler={this.createUserHandler}
              userData={userData}
              isEditMode={isEditMode}
              isReadOnlyMode={isReadOnlyMode}
              id={selectedUserId}
              editUserDataHandler={this.editUserDataHandler}
            />
          </ModalWindow>
        ) : null}

        {isDeleteModalOpen ? (
          <ModalWindow
            title='Delete member'
            isModalOpen={isDeleteModalOpen}
            toggleModalHandler={this.toggleModalDeleteHandler}
          >
            <DeleteForm
              toggleError={this.toggleError}
              item='member'
              deleteHandler={this.deleteUserHandler}
              toggleModalHandler={this.toggleModalDeleteHandler}
            />
          </ModalWindow>
        ) : null}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    users: state.users.users,
    userData: state.users.userData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      getUsers: getUsersThunk,
      removeUser: removeUserThunk,
      editUser: editUserThunk,
      createUser: createUserThunk,
      setUserData: setUserDataThunk,
      toggleLoading: loading,
    },
    dispatch,
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Members);

Members.propTypes = {
  removeUser: propTypes.func.isRequired,
  getUsers: propTypes.func.isRequired,
  editUser: propTypes.func.isRequired,
  createUser: propTypes.func.isRequired,
  setUserData: propTypes.func.isRequired,
  toggleLoading: propTypes.func.isRequired,
  users: propTypes.arrayOf(propTypes.object).isRequired,
  // userData: propTypes.oneOfType([propTypes.object, propTypes.string]),
};
