import { combineReducers } from 'redux';
import { loadingReducer } from './loadingReducer';
import { tasksReducer } from './tasksReducer';
import { usersReducer } from './usersReducer';

export const rootReducer = combineReducers({
  users: usersReducer,
  items: tasksReducer,
  loading: loadingReducer,
});
