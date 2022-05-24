import {
  CREATE_TASK,
  EDIT_TASK,
  GET_TASK,
  GET_TASKS,
  GET_USER_TASKS,
  REMOVE_TASK,
  UPDATE_TASK_STATUS,
} from '../actions/actions';
import { removeTask, updateTask, changeTaskStatus } from '../../services/tasks-services';
import { tasksAPI } from '../../services/api/api';
import { loading } from './loadingActionCreators';

const getTasks = (tasks) => ({ type: GET_TASKS, payload: { tasks } });
const deleteTask = (taskId) => ({ type: REMOVE_TASK, payload: { taskId } });
const createNewTask = (taskId, data) => ({ type: CREATE_TASK, payload: { taskId, data } });
const editTask = (taskId, data) => ({ type: EDIT_TASK, payload: { taskId, data } });
const getTask = (data) => ({ type: GET_TASK, payload: { data } });
const getUserTasks = (userTasks, userId) => ({ type: GET_USER_TASKS, payload: { userTasks, userId } });
const updateTaskStatuses = (taskId, newStatus) => ({
  type: UPDATE_TASK_STATUS,
  payload: { taskId, newStatus },
});

export function getTasksThunk() {
  return async (dispatch) => {
    dispatch(loading(true));
    const tasks = await tasksAPI.getAllTasks();
    dispatch(getTasks(tasks));
    dispatch(loading(false));
  };
}

export function removeTaskThunk(taskId) {
  return async (dispatch) => {
    dispatch(loading(true));
    await removeTask(taskId);
    dispatch(deleteTask(taskId));
    dispatch(loading(false));
  };
}

export function createTaskThunk(data) {
  return async (dispatch) => {
    dispatch(loading(true));
    const taskId = await tasksAPI.createTask(data);
    dispatch(createNewTask(taskId, data));
    const tasks = await tasksAPI.getAllTasks();
    dispatch(getTasks(tasks));
    dispatch(loading(false));
  };
}

export function editTaskThunk(taskId, data) {
  return async (dispatch) => {
    dispatch(loading(true));
    await updateTask(taskId, data);
    dispatch(editTask(taskId, data));
    dispatch(loading(false));
  };
}

export function getTaskThunk(taskId) {
  return async (dispatch) => {
    const taskData = await tasksAPI.getTask(taskId);
    dispatch(getTask({ taskId, ...taskData }));
  };
}

export function getUserTasksThunk(userId) {
  return async (dispatch) => {
    dispatch(loading(true));
    const userTasks = await tasksAPI.getUserTasks(userId);
    dispatch(getUserTasks(userTasks, userId));
    dispatch(loading(false));
  };
}

export function updateTaskStatusThunk(taskId, userId, newStatus) {
  return async (dispatch) => {
    dispatch(loading(true));
    await changeTaskStatus(taskId, userId, newStatus);
    dispatch(updateTaskStatuses(taskId, newStatus));
    dispatch(loading(false));
  };
}
