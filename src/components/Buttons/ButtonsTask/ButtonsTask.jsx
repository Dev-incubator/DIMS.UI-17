import PropTypes from 'prop-types';
import { Button } from '../Button/Button';
import { BUTTONS_NAMES, BUTTONS_TYPES } from '../../../shared/constants';

export function ButtonsTask({
  id,
  selectTaskHandler,
  toggleModalDeleteHandler,
  showTaskDataHandler,
  toggleTaskModalHandler,
}) {
  const showDeleteModal = async () => {
    await selectTaskHandler(id);
    toggleModalDeleteHandler();
  };

  const showEditModal = async () => {
    await selectTaskHandler(id);
    await showTaskDataHandler();
    toggleTaskModalHandler();
  };

  return (
    <>
      <Button title={BUTTONS_NAMES.edit} stylingType={BUTTONS_TYPES.typeEdit} onClick={showEditModal} />
      <Button title={BUTTONS_NAMES.delete} stylingType={BUTTONS_TYPES.typeDelete} onClick={showDeleteModal} />
    </>
  );
}

ButtonsTask.propTypes = {
  id: PropTypes.string,
  selectTaskHandler: PropTypes.func.isRequired,
  toggleModalDeleteHandler: PropTypes.func.isRequired,
  showTaskDataHandler: PropTypes.func.isRequired,
  toggleTaskModalHandler: PropTypes.func.isRequired,
};
ButtonsTask.defaultProps = {
  id: '0',
};
