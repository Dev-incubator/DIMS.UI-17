import { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { SettingsContext } from '../../../Hooks/useSettings';
import { Button } from '../Button/Button';
import { BUTTONS_NAMES, BUTTONS_TYPES } from '../../../shared/constants';
import edit from '../../../assets/img/edit.svg';
import del from '../../../assets/img/delete.svg';
import { isMediumScreen } from '../../../shared/helpers/checkMediaQuery/checkMediaQuery';

export function ButtonsTask({
  id,
  selectTaskHandler,
  toggleModalDeleteHandler,
  showTaskDataHandler,
  toggleTaskModalHandler,
}) {
  const { mediumBreakpoint, setBreakepointHeandler } = useContext(SettingsContext);

  useEffect(() => {
    window.addEventListener('resize', setBreakepointHeandler);

    return () => window.removeEventListener('resize', setBreakepointHeandler);
  });

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
      <Button stylingType={BUTTONS_TYPES.typeEdit} onClick={showEditModal}>
        {isMediumScreen(mediumBreakpoint) ? <img src={edit} alt='Edit' /> : BUTTONS_NAMES.edit}
      </Button>
      <Button stylingType={BUTTONS_TYPES.typeDelete} onClick={showDeleteModal}>
        {isMediumScreen(mediumBreakpoint) ? <img src={del} alt='Delete' /> : BUTTONS_NAMES.delete}
      </Button>
    </>
  );
}

ButtonsTask.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  selectTaskHandler: PropTypes.func.isRequired,
  toggleModalDeleteHandler: PropTypes.func.isRequired,
  showTaskDataHandler: PropTypes.func.isRequired,
  toggleTaskModalHandler: PropTypes.func.isRequired,
};
