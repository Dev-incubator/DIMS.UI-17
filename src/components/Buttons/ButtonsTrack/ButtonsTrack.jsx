import PropTypes from 'prop-types';
import { Button } from '../Button/Button';
import { BUTTONS_NAMES, BUTTONS_TYPES } from '../../../shared/constants';

export function ButtonsTrack({
  trackId,
  selectTrackHandler,
  toggleModalDeleteHandler,
  toggleTrackModalHandler,
  turnOnEditModeHandler,
}) {
  const showDeleteModal = async () => {
    await selectTrackHandler(trackId);
    toggleModalDeleteHandler();
  };

  const showEditModal = async () => {
    turnOnEditModeHandler();
    await selectTrackHandler(trackId);
    toggleTrackModalHandler();
  };

  return (
    <>
      <Button title={BUTTONS_NAMES.edit} stylingType={BUTTONS_TYPES.typeEdit} onClick={showEditModal} />
      <Button title={BUTTONS_NAMES.delete} stylingType={BUTTONS_TYPES.typeDelete} onClick={showDeleteModal} />
    </>
  );
}

ButtonsTrack.propTypes = {
  trackId: PropTypes.string.isRequired,
  selectTrackHandler: PropTypes.func.isRequired,
  toggleModalDeleteHandler: PropTypes.func.isRequired,
  toggleTrackModalHandler: PropTypes.func.isRequired,
  turnOnEditModeHandler: PropTypes.func.isRequired,
};
