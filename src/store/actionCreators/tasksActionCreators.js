import {
  CREATE_TASK,
  EDIT_TASK,
  GET_TASK,
  GET_TASKS,
  GET_USER_TASKS,
  REMOVE_TASK,
  RESET_USER_TASKS,
  UPDATE_TASK_STATUS,
} from '../actions/actions';
import {
  getAllTasks,
  removeTask,
  createTask,
  updateTask,
  getTaskData,
  getMemberTasks,
  changeTaskStatus,
} from '../../services/tasks-services';

const getTasks = (tasks) => ({ type: GET_TASKS, payload: { tasks } });
const deleteTask = (taskId) => ({ type: REMOVE_TASK, payload: { taskId } });
const createNewTask = (data) => ({ type: CREATE_TASK, payload: { data } });
const editTask = (taskId, data) => ({ type: EDIT_TASK, payload: { taskId, data } });
const getTask = (data) => ({ type: GET_TASK, payload: { data } });
const getUserTasks = (userTasks) => ({ type: GET_USER_TASKS, payload: { userTasks } });
const updateTaskStatuses = (taskId, updatedStatuses) => ({
  type: UPDATE_TASK_STATUS,
  payload: { taskId, updatedStatuses },
});
export const resetUserTasks = () => ({ type: RESET_USER_TASKS, payload: { userTasks: [] } });

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

export function getUserTasksThunk(userId) {
  return async (dispatch) => {
    const userTasks = await getMemberTasks(userId);
    dispatch(getUserTasks(userTasks));
  };
}

export function updateTaskStatusThunk(taskId, userId, newStatus) {
  return async (dispatch) => {
    const updatedStatuses = await changeTaskStatus(taskId, userId, newStatus);
    dispatch(updateTaskStatuses(taskId, updatedStatuses));
  };
}
