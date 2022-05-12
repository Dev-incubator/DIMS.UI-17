import { createTrack, removeTrack, updateTracks } from '../../services/tracks-services';
import { CREATE_TRACK, REMOVE_TRACK, UPDATE_TRACK } from '../actions/actions';

const createNewTrack = (taskId, data) => ({ type: CREATE_TRACK, payload: { taskId, data } });
const deleteTrack = (taskId, trackId) => ({ type: REMOVE_TRACK, payload: { taskId, trackId } });
const editTrack = (data, taskId) => ({ type: UPDATE_TRACK, payload: { data, taskId } });

export function createTrackThunk(taskId, data) {
  return async (dispatch) => {
    await createTrack(taskId, data);
    dispatch(createNewTrack(taskId, data));
  };
}

export function removeTrackThunk(taskId, trackId) {
  return async (dispatch) => {
    await removeTrack(taskId, trackId);
    dispatch(deleteTrack(taskId, trackId));
  };
}

export function updateTrackThunk(data, taskId, userId) {
  return async (dispatch) => {
    await updateTracks(data, taskId, userId);
    dispatch(editTrack(data, taskId));
  };
}
