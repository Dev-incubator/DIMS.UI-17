export function dispatchThunk(dispatch) {
  return (action) => {
    if (typeof action === 'function') {
      return action(dispatch);
    }

    return dispatch(action);
  };
}
