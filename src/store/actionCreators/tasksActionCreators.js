import {
  CREATE_TASK,
  EDIT_TASK,
  GET_TASK,
  GET_TASKS,
  GET_USER_TASKS,
  REMOVE_TASK,
  UPDATE_TASK_STATUS,
} from '../actions/actions';
import { removeTask, updateTask, getMemberTasks, changeTaskStatus } from '../../services/tasks-services';
import { tasksAPI } from '../../services/api/api';

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
    const tasks = await tasksAPI.getAllTasks();
    dispatch(getTasks(tasks));
  };
}

export function removeTaskThunk(taskId) {
  return async (dispatch) => {
    await removeTask(taskId);
    dispatch(deleteTask(taskId));
  };
}

export function createTaskThunk(data) {
  return async (dispatch) => {
    const taskId = await tasksAPI.createTask(data);
    dispatch(createNewTask(taskId, data));
    const tasks = await tasksAPI.getAllTasks();
    dispatch(getTasks(tasks));
  };
}

export function editTaskThunk(taskId, data) {
  return async (dispatch) => {
    await updateTask(taskId, data);
    dispatch(editTask(taskId, data));
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
    const userTasks = await getMemberTasks(userId);
    dispatch(getUserTasks(userTasks, userId));
  };
}

export function updateTaskStatusThunk(taskId, userId, newStatus) {
  return async (dispatch) => {
    await changeTaskStatus(taskId, userId, newStatus);
    dispatch(updateTaskStatuses(taskId, newStatus));
  };
}
