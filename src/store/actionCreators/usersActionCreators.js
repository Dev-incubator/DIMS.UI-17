import { getAllUsers, removeUserData, editUser, createUser } from '../../services/users-services ';
import { EDIT_USER, GET_USERS, REMOVE_USER } from '../actions/actions';

const getUsers = (users) => ({ type: GET_USERS, payload: { users } });
const removeUser = (userId) => ({ type: REMOVE_USER, payload: { userId } });
const editUserData = (userId, userData) => ({ type: EDIT_USER, payload: { userId, userData } });

export function getUsersThunk() {
  return async (dispatch) => {
    const users = await getAllUsers();
    dispatch(getUsers(users));
  };
}

export function removeUserThunk(userId) {
  return async (dispatch) => {
    await removeUserData(userId);
    dispatch(removeUser(userId));
  };
}

export function editUserThunk(userId, userData) {
  return async (dispatch) => {
    await editUser(userId, userData);
    dispatch(editUserData(userId, userData));
  };
}

export function createUserThunk(userData) {
  return async (dispatch) => {
    await createUser(userData);
    const users = await getAllUsers();
    dispatch(getUsers(users));
  };
}
