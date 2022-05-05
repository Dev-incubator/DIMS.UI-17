import PropTypes from 'prop-types';
import { createContext, useMemo, useReducer } from 'react';
import { rootReducer } from '../store/reducers/rootReducer';
import { loading } from '../store/actionCreators/loadingActionCreators';
import { rootReducerItinialState } from '../store/initialState';
import { dispatchThunk } from '../store/helpers/dispatchThunk';

export const StoreContext = createContext(null);

export const StoreProvider = ({ children }) => {
  const [
    {
      loading: { isFetching },
      users: { users },
    },
    dispatch,
  ] = useReducer(rootReducer, rootReducerItinialState);
  const asyncDispatchWrapper = useMemo(() => dispatchThunk(dispatch), [dispatch]);
  const toggleFetch = (value) => dispatch(loading(value));
  const value = useMemo(
    () => ({
      users,
      isFetching,
      toggleFetch,
      asyncDispatchWrapper,
    }),
    [users, isFetching, asyncDispatchWrapper],
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
};

StoreProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
