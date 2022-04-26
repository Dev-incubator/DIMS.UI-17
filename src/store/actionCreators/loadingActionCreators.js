import { LOADING } from '../actions/actions';

export const loading = (isFetching) => ({ type: LOADING, payload: isFetching });
