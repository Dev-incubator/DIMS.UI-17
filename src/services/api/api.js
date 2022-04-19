import * as axios from 'axios';
import jwtDecode from 'jwt-decode';
import { createUser, editUser, getAllUsers, getUserData, removeUserData } from '../users-services ';
import { logout, singInEmailAndPassword } from '../auth-services';

function getInstance() {
  return axios.create({
    baseURL: 'https://dims-core-api.herokuapp.com/api/',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token') || undefined}`,
      'Content-Type': 'application/json',
    },
  });
}

export const usersAPI = {
  async getUsers() {
    if (getAPIMode() === 'restAPI') {
      const response = await getInstance().get(`users`);
      const {
        data: { data },
      } = await response;

      return data;
    }

    return getAllUsers();
  },

  async getUserById(userId) {
    if (getAPIMode() === 'restAPI') {
      const response = await getInstance().get(`users/${userId}`);

      const { data } = await response;

      return data;
    }
    const userData = await getUserData(userId);

    return userData;
  },

  async createUser(userData) {
    if (getAPIMode() === 'restAPI') {
      await getInstance().post('users/', userData);
    } else {
      await createUser(userData);
    }
  },

  async removeUser(userId) {
    if (getAPIMode() === 'restAPI') {
      await getInstance().delete(`users/${userId}`);
    } else {
      await removeUserData(userId);
    }
  },

  async updateUser(userId, userData) {
    if (getAPIMode() === 'restAPI') {
      await getInstance().patch(`users/${userId}`, userData);
    } else {
      await editUser(userId, userData);
    }
  },
};

export const authAPI = {
  async login(email, password) {
    if (getAPIMode() === 'restAPI') {
      try {
        const response = await getInstance().post('auth/login', { email, password });
        const {
          data: { token },
        } = response;
        localStorage.setItem('token', token);
        const userData = await usersAPI.getUserById(authAPI.decodingToken());

        return userData;
      } catch (error) {
        console.error(error);

        return undefined;
      }
    } else {
      return singInEmailAndPassword(email, password);
    }
  },

  logout() {
    if (getAPIMode() === 'restAPI') {
      localStorage.removeItem('token');
    } else {
      logout();
    }
  },

  decodingToken() {
    const token = localStorage.getItem('token');
    const { userId } = jwtDecode(token);

    return userId;
  },
};

export const setAPIMode = (apiMode) => {
  localStorage.setItem('apiMode', apiMode);
};

function getAPIMode() {
  return localStorage.getItem('apiMode') || undefined;
}
