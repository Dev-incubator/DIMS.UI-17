import { useContext, useEffect } from 'react';
import PropTypes, { oneOfType } from 'prop-types';
import { NavLink } from 'react-router-dom';
import { Button } from '../Button/Button';
import { BUTTONS_NAMES, BUTTONS_TYPES, USER_ROLES } from '../../../shared/constants';
import { AuthContext } from '../../../Hooks/useAuth';
import { SettingsContext } from '../../../Hooks/useSettings';
import { isMediumScreen } from '../../../shared/helpers/checkMediaQuery/checkMediaQuery';
import style from './ButtonsAdmin.module.css';
import tasks from '../../../assets/img/tasks.svg';
import edit from '../../../assets/img/edit.svg';
import progress from '../../../assets/img/progress.svg';
import del from '../../../assets/img/delete.svg';

export function ButtonsAdminMemberPage({
  selectUserHandler,
  showUserDataHandler,
  id,
  toggleModalDeleteHandler,
  toggleUserModalHandler,
}) {
  const { role, userId } = useContext(AuthContext);
  const { mediumBrakpoint, setBreakepointHeandler } = useContext(SettingsContext);

  useEffect(() => {
    window.addEventListener('resize', setBreakepointHeandler);
  });

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
      <div className={style.wrapper}>
        <NavLink to={`/members/${id}/tasks`}>
          <Button>{isMediumScreen(mediumBrakpoint) ? <img src={tasks} alt='Tasks' /> : BUTTONS_NAMES.tasks}</Button>
        </NavLink>
        <NavLink to={`/members/${id}/progress`}>
          <Button>
            {isMediumScreen(mediumBrakpoint) ? <img src={progress} alt='Progress' /> : BUTTONS_NAMES.progress}
          </Button>
        </NavLink>
      </div>
      <div className={style.wrapper}>
        {role === USER_ROLES.admin && (
          <>
            <Button stylingType={BUTTONS_TYPES.typeEdit} onClick={showEditModal}>
              {isMediumScreen(mediumBrakpoint) ? <img src={edit} alt='Edit' /> : BUTTONS_NAMES.edit}
            </Button>
            {userId !== id ? (
              <Button stylingType={BUTTONS_TYPES.typeDelete} onClick={showDeleteModal}>
                {isMediumScreen(mediumBrakpoint) ? <img src={del} alt='Delete' /> : BUTTONS_NAMES.delete}
              </Button>
            ) : null}
          </>
        )}
      </div>
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
