import { useContext } from 'react';
import { AuthContext } from '../../../Hooks/useAuth';
import { Button } from '../../Buttons/Button/Button';

export function Logout() {
  const { firstName, role, logoutHandler } = useContext(AuthContext);
  function showUser() {
    return <span>{`${firstName}: ${role} `}</span>;
  }
  return (
    <>
      {showUser()}
      <Button type='button' title='Logout' onClick={logoutHandler} />
    </>
  );
}
