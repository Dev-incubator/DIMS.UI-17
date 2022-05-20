import { useLayoutEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  createUserThunk,
  editUserThunk,
  getUsersThunk,
  removeUserThunk,
  setUserDataThunk,
} from '../../../store/actionCreators/usersActionCreators';
import { PageTitle } from '../../PageTitle/PageTitle';
import { TABLE_TITLES, TITLES_PAGES, BUTTONS_NAMES, MODALTITLE_KEYS } from '../../../shared/constants';
import { ModalWindow } from '../../Common/Modal/Modal';
import { ButtonsAdminMemberPage } from '../../Buttons/ButtonsAdmin/ButtonsAdmin';
import { CreateMemberForm } from '../../Forms/CreateMemberForm/CreateMemberForm';
import { DeleteForm } from '../../Forms/DeleteForm/DeleteForm';
import { MembersTableRow } from '../../Table/MembersTableRow';
import { Table } from '../../Table/Table';
import { getAge } from '../../../shared/helpers/getAge/getAge';
import { Loader } from '../../Common/Loader/Loader';
import { getAllUsers, getIsFetching } from '../../../store/selectors/selectors';

export function Members() {
  const users = useSelector(getAllUsers);
  const isFetching = useSelector(getIsFetching);
  const dispatch = useDispatch();
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isReadOnlyMode, setIsReadOnlyMode] = useState(false);

  useLayoutEffect(() => {
    dispatch(getUsersThunk());
  }, [dispatch]);

  const getUserData = async (userId) => {
    await dispatch(setUserDataThunk(userId));
  };

  const deleteUserHandler = () => {
    dispatch(removeUserThunk(selectedUserId));
    toggleModal();
  };

  const createUserHandler = (userData) => {
    dispatch(createUserThunk(userData));
    toggleModal();
  };

  const editUserDataHandler = (userData) => {
    dispatch(editUserThunk(selectedUserId, userData));
    toggleModal();
  };

  const selectUserHandler = (userId) => {
    setSelectedUserId(userId);
  };

  const showUserDataHandler = async (userId, readOnlyMode = false) => {
    await getUserData(userId);
    setIsEditMode(true);
    setIsReadOnlyMode(readOnlyMode);
  };

  const toggleUserModalHandler = () => {
    if (isUserModalOpen) {
      setIsUserModalOpen(!isUserModalOpen);
      setSelectedUserId(null);
      setIsEditMode(false);
      setIsReadOnlyMode(false);
    } else {
      setIsUserModalOpen(!isUserModalOpen);
    }
  };

  const toggleModalDeleteHandler = () => {
    if (isDeleteModalOpen) {
      setSelectedUserId(null);
      setIsDeleteModalOpen(!isDeleteModalOpen);
    } else {
      setIsDeleteModalOpen(!isDeleteModalOpen);
    }
  };

  const toggleModal = () => {
    if (isUserModalOpen) {
      toggleUserModalHandler();
    } else if (isDeleteModalOpen) {
      toggleModalDeleteHandler();
    }
  };
  const userData = users.find((user) => user.userId === selectedUserId);
  const items = users.map((user, index) => {
    const showReadOnlyModal = async () => {
      selectUserHandler(user.userId);
      await showUserDataHandler(user.userId, true);
      toggleUserModalHandler();
    };

    return (
      <MembersTableRow
        key={user.name + index.toString()}
        index={index + 1}
        firstName={user.firstName}
        lastName={user.lastName}
        directionName={user.directionName}
        education={user.education}
        startDate={user.startDate}
        birthDate={getAge(user.birthDate)}
        action={
          <ButtonsAdminMemberPage
            selectUserHandler={selectUserHandler}
            showUserDataHandler={showUserDataHandler}
            toggleModalDeleteHandler={toggleModalDeleteHandler}
            toggleUserModalHandler={toggleUserModalHandler}
            id={user.userId}
          />
        }
        showReadOnlyModal={showReadOnlyModal}
      />
    );
  });

  return isFetching ? (
    <Loader />
  ) : (
    <>
      <PageTitle title={TITLES_PAGES.members} buttonTitle={BUTTONS_NAMES.create} onClick={toggleUserModalHandler} />

      <Table title={TABLE_TITLES.members} items={items} bordered={false} striped={false} hover={false} />

      {isUserModalOpen ? (
        <ModalWindow
          title={MODALTITLE_KEYS.createMember}
          isModalOpen={isUserModalOpen}
          toggleModalHandler={toggleUserModalHandler}
        >
          <CreateMemberForm
            toggleModalHandler={toggleUserModalHandler}
            createUserHandler={createUserHandler}
            userData={userData}
            isEditMode={isEditMode}
            isReadOnlyMode={isReadOnlyMode}
            id={selectedUserId}
            editUserDataHandler={editUserDataHandler}
          />
        </ModalWindow>
      ) : null}

      {isDeleteModalOpen ? (
        <ModalWindow
          title='Delete member'
          isModalOpen={isDeleteModalOpen}
          toggleModalHandler={toggleModalDeleteHandler}
        >
          <DeleteForm item='member' deleteHandler={deleteUserHandler} toggleModalHandler={toggleModalDeleteHandler} />
        </ModalWindow>
      ) : null}
    </>
  );
}
