import React from 'react';
import { PageTitle } from '../../PageTitle/PageTitle';
import { TABLE_TITLES, TITLES_PAGES, BUTTONS_NAMES, MODALTITLE_KEYS } from '../../../shared/constants';
import { ModalWindow } from '../../Common/Modal/Modal';
import { getAllUsers, removeUserData, getUserData, createUser, editUser } from '../../../services/users-services ';
import { ButtonsAdminMemberPage } from '../../Buttons/ButtonsAdmin/ButtonsAdmin';
import { CreateMemberForm } from '../../Forms/CreateMemberForm/CreateMemberForm';
import { DeleteForm } from '../../Forms/DeleteForm/DeleteForm';
import { MembersTableRow } from '../../Table/MembersTableRow';
import { Table } from '../../Table/Table';

export class Members extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      userData: null,
      isUserModalOpen: false,
      isDeleteModalOpen: false,
      selectedUserId: null,
      isEditMode: false,
      isReadOnlyMode: false,
    };
  }

  async componentDidMount() {
    await this.getUsers();
  }

  async componentDidUpdate(prevProps, prevState) {
    const { users } = this.state;
    if (prevState.users !== users && prevState.users.length) {
      this.toggleModal();
    }
  }

  async getUserData() {
    const { selectedUserId } = this.state;
    const userData = await getUserData(selectedUserId);

    this.setState({ userData });
  }

  getUsers = async () => {
    const users = await getAllUsers();

    this.setState({ users });
  };

  deleteUserHandler = async () => {
    const { selectedUserId, users } = this.state;
    const updatedUsers = users.filter((item) => item.id !== selectedUserId);

    await removeUserData(selectedUserId);
    this.setState({ users: updatedUsers });
  };

  createUserHandler = async (userData) => {
    const { users } = this.state;
    const updatedUsers = [...users, userData];

    await createUser(userData);
    this.setState({ users: updatedUsers });
  };

  editUserDataHandler = async (userData) => {
    const { users, selectedUserId } = this.state;
    const updatedUsers = users.map((item) => (item.id === selectedUserId ? { id: selectedUserId, ...userData } : item));
    await editUser(selectedUserId, userData);
    this.setState({ users: updatedUsers });
  };

  selectUserHandler = (selectedUserId) => {
    this.setState({ selectedUserId });
  };

  showUserDataHandler = async (isReadOnlyMode = false) => {
    await this.getUserData();
    this.setState({ isEditMode: true, isReadOnlyMode });
  };

  toggleUserModalHandler = () => {
    this.setState((prevState) => {
      const { isUserModalOpen } = this.state;

      return isUserModalOpen
        ? {
            ...prevState,
            isUserModalOpen: !prevState.isUserModalOpen,
            selectedUserId: null,
            isEditMode: false,
            isReadOnlyMode: false,
          }
        : { ...prevState, isUserModalOpen: !prevState.isUserModalOpen };
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

  toggleModalDeleteHandler = () => {
    this.setState((prevState) => {
      const { isDeleteModalOpen } = prevState;

      return isDeleteModalOpen
        ? { selectedUserId: null, isDeleteModalOpen: !prevState.isDeleteModalOpen }
        : { isDeleteModalOpen: !prevState.isDeleteModalOpen };
    });
  };

  render() {
    const { users, isUserModalOpen, isDeleteModalOpen, userData, isEditMode, selectedUserId, isReadOnlyMode } =
      this.state;
    const items = users.map((user, index) => {
      const showReadOnlyModal = async () => {
        await this.selectUserHandler(user.id);
        await this.showUserDataHandler(true);
        this.toggleUserModalHandler();
      };

      return (
        <MembersTableRow
          key={user.name + index.toString()}
          index={index}
          name={user.name}
          lastName={user.lastName}
          direction={user.direction}
          education={user.education}
          startDate={user.startDate}
          birthDate={user.birthDate}
          action={
            <ButtonsAdminMemberPage
              selectUserHandler={this.selectUserHandler}
              showUserDataHandler={this.showUserDataHandler}
              toggleModalDeleteHandler={this.toggleModalDeleteHandler}
              toggleUserModalHandler={this.toggleUserModalHandler}
              id={user.id}
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
