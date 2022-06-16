import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../../../Hooks/useAuth';
import { Button } from '../../Buttons/Button/Button';
import style from './Logout.module.css';

export function Logout() {
  const { firstName, role, logoutHandler } = useContext(AuthContext);
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
        <Button type='button' title='Logout' onClick={logoutHandler} />
      </NavLink>
    </>
  );
}
