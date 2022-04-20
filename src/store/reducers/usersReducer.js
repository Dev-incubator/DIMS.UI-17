import { usersInitialState } from '../initialState';
import { CREATE_USER, EDIT_USER, GET_USERS, REMOVE_USER, SET_USER } from '../actions/actions';

export const usersReducer = (state = usersInitialState, action = {}) => {
  switch (action.type) {
    case GET_USERS:
      return {
        ...state,
        users: action.payload.users,
      };
    case REMOVE_USER:
      return {
        ...state,
        users: state.users.filter((item) => item.userId !== action.payload.userId),
      };
    case EDIT_USER:
      return {
        ...state,
        users: state.users.map((item) =>
          item.userId === action.payload.userId ? { userId: action.payload.userId, ...action.payload.userData } : item,
        ),
      };
    case CREATE_USER:
      return {
        ...state,
        users: [...state.users, action.payload.userData],
      };
    case SET_USER:
      return {
        ...state,
        userData: action.payload.userData,
      };
    default:
      return state;
  }
};
