import { useContext } from 'react';
import PropTypes, { oneOfType } from 'prop-types';
import { NavLink } from 'react-router-dom';
import { Button } from '../Button/Button';
import { BUTTONS_NAMES, BUTTONS_TYPES, USER_ROLES } from '../../../shared/constants';
import { AuthContext } from '../../../Hooks/useAuth';

export function ButtonsAdminMemberPage({
  selectUserHandler,
  showUserDataHandler,
  id,
  toggleModalDeleteHandler,
  toggleUserModalHandler,
}) {
  const { role } = useContext(AuthContext);
  const showDeleteModal = () => {
    selectUserHandler(id);
    toggleModalDeleteHandler();
  };

  const showEditModal = async () => {
    selectUserHandler(id);
    await showUserDataHandler(id, false);
    toggleUserModalHandler();
  };

  return (
    <>
      <NavLink to={`/tasks/${id}`}>
        <Button title={BUTTONS_NAMES.tasks} />
      </NavLink>
      <NavLink to={`/progress/${id}`}>
        <Button title={BUTTONS_NAMES.progress} />
      </NavLink>
      {role === USER_ROLES.admin && (
        <>
          <Button title={BUTTONS_NAMES.edit} stylingType={BUTTONS_TYPES.typeEdit} onClick={showEditModal} />
          <Button title={BUTTONS_NAMES.delete} stylingType={BUTTONS_TYPES.typeDelete} onClick={showDeleteModal} />
        </>
      )}
    </>
  );
}

ButtonsAdminMemberPage.propTypes = {
  selectUserHandler: PropTypes.func.isRequired,
  showUserDataHandler: PropTypes.func.isRequired,
  toggleModalDeleteHandler: PropTypes.func.isRequired,
  toggleUserModalHandler: PropTypes.func.isRequired,
  id: oneOfType([PropTypes.number, PropTypes.string]).isRequired,
};
