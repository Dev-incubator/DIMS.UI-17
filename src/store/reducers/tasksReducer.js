import { tasksInitialState } from '../initialState';
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

export const tasksReducer = (state = tasksInitialState, action = {}) => {
  switch (action.type) {
    case GET_TASKS:
      return {
        ...state,
        tasks: action.payload.tasks,
      };
    case REMOVE_TASK:
      return {
        ...state,
        tasks: state.tasks.filter((item) => item.id !== action.payload.taskId),
      };
    case CREATE_TASK:
      return {
        ...state,
        tasks: [...state.tasks, action.payload.data],
      };
    case EDIT_TASK:
      return {
        ...state,
        tasks: state.tasks.map((item) =>
          item.id === action.payload.taskId ? { ...action.payload.data, id: action.payload.taskId } : item,
        ),
      };
    case GET_TASK:
      return {
        ...state,
        taskData: action.payload.data,
      };
    case GET_USER_TASKS:
      return {
        ...state,
        userTasks: action.payload.userTasks,
      };
    case UPDATE_TASK_STATUS:
      return {
        ...state,
        userTasks: state.userTasks.map((item) =>
          item.id === action.payload.taskId ? { ...item, statuses: action.payload.updatedStatuses } : item,
        ),
      };

    case RESET_USER_TASKS:
      return {
        ...state,
        userTasks: action.payload.userTasks,
      };

    default:
      return state;
  }
};
