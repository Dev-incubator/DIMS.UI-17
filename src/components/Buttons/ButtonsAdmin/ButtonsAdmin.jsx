import PropTypes from 'prop-types';
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
  const showDeleteModal = async () => {
    await selectUserHandler(id);
    toggleModalDeleteHandler();
  };

  const showEditModal = async () => {
    await selectUserHandler(id);
    await showUserDataHandler();
    toggleUserModalHandler();
  };

  return (
    <AuthContext.Consumer>
      {({ role }) => {
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
      }}
    </AuthContext.Consumer>
  );
}

ButtonsAdminMemberPage.propTypes = {
  selectUserHandler: PropTypes.func.isRequired,
  showUserDataHandler: PropTypes.func.isRequired,
  toggleModalDeleteHandler: PropTypes.func.isRequired,
  toggleUserModalHandler: PropTypes.func.isRequired,
  id: PropTypes.string,
};

ButtonsAdminMemberPage.defaultProps = {
  id: '0',
};
