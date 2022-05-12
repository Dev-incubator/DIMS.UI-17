import { useContext } from 'react';
import { AuthContext } from '../../../Hooks/useAuth';
import { Button } from '../../Buttons/Button/Button';
import style from './Logout.module.css';

export function Logout() {
  const { firstName, role, logoutHandler } = useContext(AuthContext);
  function showUser() {
    return <span className={style.user}>{`${firstName}: ${role} `}</span>;
  }

  return (
    <>
      {showUser()}
      <Button type='button' title='Logout' onClick={logoutHandler} />
    </>
  );
}
