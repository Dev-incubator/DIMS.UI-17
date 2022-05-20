import * as axios from 'axios';
import { createUser, editUser, getAllUsers, getUserData, removeUserData } from '../users-services ';
import { createTask, getAllTasks, getTaskData } from '../tasks-services';
import { logout, singInEmailAndPassword } from '../auth-services';

const BASE_API_URL = process.env.REACT_APP_API_DATA_BASEURL;

function getToken() {
  return localStorage.getItem('token');
}

const instance = axios.create({
  baseURL: BASE_API_URL,
});

instance.interceptors.request.use((req) => {
  req.headers.Authorization = `Bearer ${getToken()}`;

  return req;
});

export const usersAPI = {
  async getUsers() {
    if (isRestAPIMode()) {
      const response = await instance.get(`users`);
      const {
        data: { data },
      } = await response;
      const users = data.map((user) => ({ ...user, userId: user.id }));

      return users;
    }

    return getAllUsers();
  },

  async getUserById(userId) {
    if (isRestAPIMode()) {
      const response = await instance.get(`users/${userId}`);

      const { data } = await response;

      return { ...data, userId: data.id };
    }
    const userData = await getUserData(userId);

    return userData;
  },

  async createUser(userData) {
    if (isRestAPIMode()) {
      await instance.post('users/', userData);
    } else {
      await createUser(userData);
    }
  },

  async removeUser(userId) {
    if (isRestAPIMode()) {
      await instance.delete(`users/${userId}`);
    } else {
      await removeUserData(userId);
    }
  },

  async updateUser(userId, userData) {
    if (isRestAPIMode()) {
      await instance.patch(`users/${userId}`, userData);
    } else {
      await editUser(userId, userData);
    }
  },
};

export const authAPI = {
  async login(email, password) {
    if (isRestAPIMode()) {
      try {
        const response = await instance.post('auth/login', { email, password });
        const {
          data: { token },
        } = response;
        localStorage.setItem('token', token);
        const {
          data: { userId },
        } = await instance.get('auth/me', token);
        const userData = await usersAPI.getUserById(userId);
        const { roles, firstName, id } = userData;
        localStorage.setItem('user', JSON.stringify({ roles, firstName, userId: id }));

        return userData;
      } catch (error) {
        console.error(error);

        return undefined;
      }
    } else {
      return singInEmailAndPassword(email, password);
    }
  },

  async logout() {
    if (isRestAPIMode()) {
      localStorage.removeItem('token');
      localStorage.setItem('user', null);
    } else {
      await logout();
    }
  },
};

export const tasksAPI = {
  async getAllTasks() {
    if (isRestAPIMode()) {
      try {
        const response = await instance.get(`tasks`);
        const { data } = response;

        return data;
      } catch (error) {
        console.error(error);
      }
    }
    const tasks = await getAllTasks();

    return tasks;
  },

  async getTask(taskId) {
    if (isRestAPIMode()) {
      try {
        const response = await instance.get(`tasks/${taskId}`);
        const { data } = response;

        return data;
      } catch (error) {
        console.error(error);
      }
    }
    const taskData = await getTaskData(taskId);

    return taskData;
  },

  async createTask(data) {
    if (isRestAPIMode()) {
      const { statuses, tracks, ...taskData } = data;
      try {
        const response = await instance.post(`tasks`, taskData);

        return response;
      } catch (error) {
        console.error(error);
      }
    }
    const taskId = await createTask(data);

    return taskId;
  },
};

export const setAPIMode = (apiMode) => {
  localStorage.setItem('apiMode', apiMode);
};

export function isRestAPIMode() {
  return localStorage.getItem('apiMode') === 'restAPI';
}
