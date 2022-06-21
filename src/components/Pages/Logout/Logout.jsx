import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../../../Hooks/useAuth';
import { SettingsContext } from '../../../Hooks/useSettings';
import { Button } from '../../Buttons/Button/Button';
import style from './Logout.module.css';
import logout from '../../../assets/img/logout.svg';

export function Logout() {
  const { firstName, role, logoutHandler } = useContext(AuthContext);
  const { isLargeBreakpoint } = useContext(SettingsContext);
  function showUser() {
    return (
      <span className={style.user}>
        <i>{firstName}</i>
        <i>: {role}</i>
      </span>
    );
  }

  return (
    <>
      {showUser()}
      <NavLink to='/login'>
        <Button type='button' onClick={logoutHandler}>
          {isLargeBreakpoint ? <img src={logout} alt='Logout' /> : 'Logout'}
        </Button>
      </NavLink>
    </>
  );
}
