import PropTypes from 'prop-types';
import { createContext, useMemo, useReducer } from 'react';
import { rootReducer } from '../store/reducers/rootReducer';
import { loading } from '../store/actionCreators/loadingActionCreators';
import { rootReducerItinialState } from '../store/initialState';

export const StoreContext = createContext(null);

export const StoreProvider = ({ children }) => {
  const [
    {
      loading: { isFetching },
    },
    dispatch,
  ] = useReducer(rootReducer, rootReducerItinialState);
  const toggleFetch = (value) => dispatch(loading(value));
  const value = useMemo(
    () => ({
      isFetching,
      toggleFetch,
    }),
    [isFetching],
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
};

StoreProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
