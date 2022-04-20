import { CREATE_TASK, EDIT_TASK, GET_TASK, GET_TASKS, REMOVE_TASK } from '../actions/actions';
import { getAllTasks, removeTask, createTask, updateTask, getTaskData } from '../../services/tasks-services';

const getTasks = (tasks) => ({ type: GET_TASKS, payload: { tasks } });
const deleteTask = (taskId) => ({ type: REMOVE_TASK, payload: { taskId } });
const createNewTask = (data) => ({ type: CREATE_TASK, payload: { data } });
const editTask = (taskId, data) => ({ type: EDIT_TASK, payload: { taskId, data } });
const getTask = (data) => ({ type: GET_TASK, payload: { data } });

export function getTasksThunk() {
  return async (dispatch) => {
    const tasks = await getAllTasks();
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
    await createTask(data);
    dispatch(createNewTask(data));
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
    const taskData = await getTaskData(taskId);
    dispatch(getTask(taskData));
  };
}
