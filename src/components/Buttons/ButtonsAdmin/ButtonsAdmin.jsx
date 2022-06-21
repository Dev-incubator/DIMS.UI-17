import { useContext } from 'react';
import PropTypes, { oneOfType } from 'prop-types';
import { SettingsContext } from '../../../Hooks/useSettings';
import { DropdownButtonsAdmin } from './DropdownButtonsAdmin';
import { Buttons } from './Buttons';

export function ButtonsAdminMemberPage({
  selectUserHandler,
  showUserDataHandler,
  id,
  toggleModalDeleteHandler,
  toggleUserModalHandler,
}) {
  const { isXSBreakpoint } = useContext(SettingsContext);

  return isXSBreakpoint ? (
    <DropdownButtonsAdmin
      selectUserHandler={selectUserHandler}
      showUserDataHandler={showUserDataHandler}
      id={id}
      toggleModalDeleteHandler={toggleModalDeleteHandler}
      toggleUserModalHandler={toggleUserModalHandler}
    />
  ) : (
    <Buttons
      selectUserHandler={selectUserHandler}
      showUserDataHandler={showUserDataHandler}
      id={id}
      toggleModalDeleteHandler={toggleModalDeleteHandler}
      toggleUserModalHandler={toggleUserModalHandler}
    />
  );
}

ButtonsAdminMemberPage.propTypes = {
  selectUserHandler: PropTypes.func.isRequired,
  showUserDataHandler: PropTypes.func.isRequired,
  toggleModalDeleteHandler: PropTypes.func.isRequired,
  toggleUserModalHandler: PropTypes.func.isRequired,
  id: oneOfType([PropTypes.number, PropTypes.string]).isRequired,
};
