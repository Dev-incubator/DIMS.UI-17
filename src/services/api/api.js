import * as axios from 'axios';
import jwtDecode from 'jwt-decode';
import { logout, singInEmailAndPassword } from '../auth-services';

function getInstance() {
  return axios.create({
    baseURL: 'https://dims-core-api.herokuapp.com/api/',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token') || undefined}`,
    },
  });
}

export const usersAPI = {
  async getUsers() {
    const response = await getInstance().get(`users`);
    const { data } = await response;
    console.log(data);
  },

  async getUserById(id) {
    const response = await getInstance().get(`users/${id}`);

    const { data } = await response;

    return data;
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
    }

    return singInEmailAndPassword(email, password);
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
