import { usersInitilState } from '../initialState';
import { CREATE_USER, EDIT_USER, GET_USERS, REMOVE_USER } from '../actions/actions';

export const usersReducer = (state = usersInitilState, action = {}) => {
  switch (action.type) {
    case GET_USERS:
      return {
        ...state,
        users: action.payload.users,
      };
    case REMOVE_USER:
      return {
        ...state,
        users: state.users.filter((item) => item.id !== action.payload.userId),
      };
    case EDIT_USER:
      return {
        ...state,
        users: state.users.map((item) =>
          item.id === action.payload.userId ? { id: action.payload.userId, ...action.payload.userData } : item,
        ),
      };
    case CREATE_USER:
      return {
        ...state,
        users: [...state.users, action.payload.userData],
      };
    default:
      return state;
  }
};
