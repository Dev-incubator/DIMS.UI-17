import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '../Button/Button';
import { BUTTONS_NAMES, BUTTONS_TYPES } from '../../../shared/constants';
import { MyModal } from '../../Common/Modal/Modal';
import { getTracks, removeTrack } from '../../../services/tracks-services';
import { CreateTrackForm } from '../../Forms/CreateTrackForm/CreateTrackForm';
import { DeleteForm } from '../../Forms/DeleteForm/DeleteForm';

export class ButtonsTrack extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDeleteModalOpen: false,
      isEditModalOpen: false,
    };
  }

  toggleModalEditHandler = () => {
    this.setState((prevState) => ({ isEditModalOpen: !prevState.isEditModalOpen }));
  };

  toggleModalDeleteHandler = () => {
    this.setState((prevState) => ({ isDeleteModalOpen: !prevState.isDeleteModalOpen }));
  };

  deleteTrackHandler = async () => {
    const { id, setTracksHandler, userId, taskId } = this.props;
    await removeTrack(taskId, id);
    const updatedTracks = await getTracks(taskId, userId);
    setTracksHandler(updatedTracks);
    this.toggleModalDeleteHandler();
  };

  render() {
    const { isDeleteModalOpen, isEditModalOpen } = this.state;
    const { tracks, id, userTasks, setTracksHandler, taskId, userId } = this.props;

    return (
      <>
        <Button title={BUTTONS_NAMES.edit} stylingType={BUTTONS_TYPES.typeEdit} onClick={this.toggleModalEditHandler} />
        <Button
          title={BUTTONS_NAMES.delete}
          stylingType={BUTTONS_TYPES.typeDelete}
          onClick={this.toggleModalDeleteHandler}
        />

        {isDeleteModalOpen && (
          <MyModal
            title='Delete track'
            isModalOpen={isDeleteModalOpen}
            toggleModalHandler={this.toggleModalDeleteHandler}
          >
            <DeleteForm
              item='track'
              deleteHandler={this.deleteTrackHandler}
              toggleModalHandler={this.toggleModalDeleteHandler}
            />
          </MyModal>
        )}
        {isEditModalOpen && (
          <MyModal title='Track Data' isModalOpen={isEditModalOpen} toggleModalHandler={this.toggleModalEditHandler}>
            <CreateTrackForm
              id={id}
              userId={userId}
              taskId={taskId}
              tracks={tracks}
              setTracksHandler={setTracksHandler}
              isEditMode
              toggleModalHandler={this.toggleModalEditHandler}
              userTasks={userTasks}
            />
          </MyModal>
        )}
      </>
    );
  }
}

ButtonsTrack.propTypes = {
  setTracksHandler: PropTypes.func.isRequired,
  id: PropTypes.string,
  userId: PropTypes.string.isRequired,
  taskId: PropTypes.string.isRequired,
  tracks: PropTypes.arrayOf(PropTypes.object).isRequired,
  userTasks: PropTypes.arrayOf(PropTypes.shape({})),
};

ButtonsTrack.defaultProps = {
  userTasks: [],
  id: '0',
};
