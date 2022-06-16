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
      <Button stylingType={BUTTONS_TYPES.typeEdit} onClick={showEditModal}>
        {BUTTONS_NAMES.edit}
      </Button>
      <Button stylingType={BUTTONS_TYPES.typeDelete} onClick={showDeleteModal}>
        {BUTTONS_NAMES.delete}
      </Button>
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
