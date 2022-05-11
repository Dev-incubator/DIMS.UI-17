import { EDIT_USER, GET_USERS, REMOVE_USER, SET_USER } from '../actions/actions';
import { usersAPI } from '../../services/api/api';
import { loading } from './loadingActionCreators';

const getUsers = (users) => ({ type: GET_USERS, payload: { users } });
const removeUser = (userId) => ({ type: REMOVE_USER, payload: { userId } });
const editUserData = (userId, userData) => ({ type: EDIT_USER, payload: { userId, userData } });
const setUserData = (userData) => ({ type: SET_USER, payload: { userData } });

export function getUsersThunk() {
  return async (dispatch) => {
    dispatch(loading(true));
    const users = await usersAPI.getUsers();
    dispatch(getUsers(users));
    dispatch(loading(false));
  };
}

export function removeUserThunk(userId) {
  return async (dispatch) => {
    dispatch(loading(true));
    await usersAPI.removeUser(userId);
    dispatch(removeUser(userId));
    dispatch(loading(false));
  };
}

export function editUserThunk(userId, userData) {
  return async (dispatch) => {
    dispatch(loading(true));
    await usersAPI.updateUser(userId, userData);
    dispatch(editUserData(userId, userData));
    dispatch(loading(false));
  };
}

export function createUserThunk(userData) {
  return async (dispatch) => {
    dispatch(loading(true));
    await usersAPI.createUser(userData);
    const users = await usersAPI.getUsers();
    dispatch(getUsers(users));
    dispatch(loading(false));
  };
}

export function setUserDataThunk(userId) {
  return async (dispatch) => {
    const userData = await usersAPI.getUserById(userId);
    dispatch(setUserData({ userId, ...userData }));
  };
}
