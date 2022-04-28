import { loaderInitialState } from '../initialState';
import { LOADING } from '../actions/actions';

export const loadingReducer = (state = loaderInitialState, action = {}) => {
  switch (action.type) {
    case LOADING:
      return {
        ...state,
        isFetching: action.payload,
      };
    default:
      return state;
  }
};
