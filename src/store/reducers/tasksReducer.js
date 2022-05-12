import { tasksInitialState } from '../initialState';
import {
  CREATE_TASK,
  CREATE_TRACK,
  EDIT_TASK,
  GET_TASK,
  GET_TASKS,
  GET_USER_TASKS,
  REMOVE_TASK,
  REMOVE_TRACK,
  UPDATE_TASK_STATUS,
  UPDATE_TRACK,
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
        tasks: state.tasks.filter((item) => item.taskId !== action.payload.taskId),
      };
    case CREATE_TASK:
      return {
        ...state,
        tasks: [...state.tasks, { ...action.payload.data, taskId: action.payload.taskId }],
        taskData: null,
      };
    case EDIT_TASK:
      return {
        ...state,
        tasks: state.tasks.map((item) =>
          item.taskId === action.payload.taskId ? { ...action.payload.data, taskId: action.payload.taskId } : item,
        ),
      };
    case GET_TASK:
      return {
        ...state,
        tasks: state.tasks.map((task) => (task.taskId === action.payload.data.taskId ? action.payload.data : task)),
      };
    case GET_USER_TASKS:
      return {
        ...state,
        tasks: action.payload.userTasks.map((item) => ({
          ...item,
          status: item.statuses.find((elem) => elem.id === action.payload.userId).status,
          tracks: item.tracks.filter((elem) => elem.userId === action.payload.userId),
        })),
      };
    case UPDATE_TASK_STATUS:
      return {
        ...state,
        tasks: state.tasks.map((item) =>
          item.taskId === action.payload.taskId ? { ...item, status: action.payload.newStatus } : item,
        ),
      };
    case CREATE_TRACK:
      return {
        ...state,
        tasks: state.tasks.map((item) =>
          item.taskId === action.payload.taskId ? { ...item, tracks: [...item.tracks, action.payload.data] } : item,
        ),
      };
    case REMOVE_TRACK:
      return {
        ...state,
        tasks: state.tasks.map((item) =>
          item.taskId === action.payload.taskId
            ? { ...item, tracks: item.tracks.filter((track) => track.id !== action.payload.trackId) }
            : item,
        ),
      };
    case UPDATE_TRACK:
      return {
        ...state,
        tasks: state.tasks.map((item) =>
          item.taskId === action.payload.taskId
            ? {
                ...item,
                tracks: item.tracks.map((track) => (track.id === action.payload.data.id ? action.payload.data : track)),
              }
            : item,
        ),
      };

    default:
      return state;
  }
};
