import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '../Button/Button';
import { BUTTONS_NAMES, BUTTONS_TYPES } from '../../../shared/constants';

export class ButtonsTrack extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     isEditModalOpen: false,
  //   };
  // }

  // toggleModalEditHandler = () => {
  //   this.setState((prevState) => ({ isEditModalOpen: !prevState.isEditModalOpen }));
  // };

  // toggleModalDeleteHandler = () => {
  //   this.setState((prevState) => ({ isDeleteModalOpen: !prevState.isDeleteModalOpen }));
  // };

  // deleteTrackHandler = async () => {
  //   const { id, setTracksHandler, userId, taskId } = this.props;
  //   await removeTrack(taskId, id);
  //   const updatedTracks = await getTracks(taskId, userId);
  //   setTracksHandler(updatedTracks);
  //   this.toggleModalDeleteHandler();
  // };

  showDeleteModal = async () => {
    const { trackId, selectTrackHandler, toggleModalDeleteHandler } = this.props;
    await selectTrackHandler(trackId);
    toggleModalDeleteHandler();
  };

  showEditModal = async () => {
    const { trackId, selectTrackHandler, toggleTrackModalHandler, turnOnEditModeHandler } = this.props;
    turnOnEditModeHandler();
    await selectTrackHandler(trackId);
    toggleTrackModalHandler();
  };

  render() {
    // const { isEditModalOpen } = this.state;
    // const { tracks, trackId, userTasks, setTracksHandler, taskId, userId } = this.props;
    // console.log(trackId);

    return (
      <>
        <Button title={BUTTONS_NAMES.edit} stylingType={BUTTONS_TYPES.typeEdit} onClick={this.showEditModal} />
        <Button title={BUTTONS_NAMES.delete} stylingType={BUTTONS_TYPES.typeDelete} onClick={this.showDeleteModal} />

        {/* {isEditModalOpen && (
          <ModalWindow
            title='Track Data'
            isModalOpen={isEditModalOpen}
            toggleModalHandler={this.toggleModalEditHandler}
          >
            <CreateTrackForm
              id={trackId}
              userId={userId}
              taskId={taskId}
              tracks={tracks}
              setTracksHandler={setTracksHandler}
              isEditMode
              toggleModalHandler={this.toggleModalEditHandler}
              userTasks={userTasks}
            />
          </ModalWindow>
        )} */}
      </>
    );
  }
}

ButtonsTrack.propTypes = {
  trackId: PropTypes.string.isRequired,
  selectTrackHandler: PropTypes.func.isRequired,
  toggleModalDeleteHandler: PropTypes.func.isRequired,
  toggleTrackModalHandler: PropTypes.func.isRequired,
  turnOnEditModeHandler: PropTypes.func.isRequired,
};
