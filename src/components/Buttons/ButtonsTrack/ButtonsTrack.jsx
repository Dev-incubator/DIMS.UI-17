import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '../Button/Button';
import { BUTTONS_NAMES, BUTTONS_TYPES } from '../../../shared/constants';
import { DeleteModal } from '../../Common/Modal/DeleteModal/DeleteModal';
import { Modal } from '../../Common/Modal/Modal';
import { CreateTrackModal } from '../../Common/Modal/CreateTrackModal/CreateTrackModal';
import { getTracks, removeTrack } from '../../../services/tasks-services';

export class ButtonsTrack extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDeleteModalOpen: false,
      isEditModalOpen: false,
    };
  }

  toggleModalEdit = () => {
    this.setState((prevState) => ({ isEditModalOpen: !prevState.isEditModalOpen }));
  };

  toggleModalDelete = () => {
    this.setState((prevState) => ({ isDeleteModalOpen: !prevState.isDeleteModalOpen }));
  };

  showTaskData = async () => {
    this.toggleModalEdit();
  };

  deleteTrack = async () => {
    const { id, handleSetTracks, userId, taskId } = this.props;
    await removeTrack(taskId, id);
    const updatedTracks = await getTracks(taskId, userId);
    handleSetTracks(updatedTracks);
    this.toggleModalDelete();
  };

  render() {
    const { isDeleteModalOpen, isEditModalOpen, handleSetTracks } = this.state;
    const { tracks, id, userTasks } = this.props;

    return (
      <>
        <Button title={BUTTONS_NAMES.edit} stylingType={BUTTONS_TYPES.typeEdit} onClick={this.showTaskData} />
        <Button title={BUTTONS_NAMES.delete} stylingType={BUTTONS_TYPES.typeDelete} onClick={this.toggleModalDelete} />

        {isDeleteModalOpen && (
          <Modal title='Delete track' isModalOpen={isDeleteModalOpen} handleToggleModal={this.toggleModalDelete}>
            <DeleteModal item='track' handleDelete={this.deleteTrack} handleToggleModal={this.toggleModalDelete} />
          </Modal>
        )}
        {isEditModalOpen && (
          <Modal title='Track Data' isModalOpen={isEditModalOpen} handleToggleModal={this.toggleModalEdit}>
            <CreateTrackModal
              id={id}
              tracks={tracks}
              handleSetTracks={handleSetTracks}
              isEditMode
              handleToggleModal={this.toggleModalEdit}
              userTasks={userTasks}
            />
          </Modal>
        )}
      </>
    );
  }
}

ButtonsTrack.propTypes = {
  handleSetTracks: PropTypes.func.isRequired,
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
