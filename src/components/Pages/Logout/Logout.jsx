import { AuthContext } from '../../../Hooks/useAuth';
import { Button } from '../../Buttons/Button/Button';

export function Logout() {
  return (
    <AuthContext.Consumer>
      {({ name, role, logoutHandler }) => {
        return (
          <>
            <span>{`${name}: ${role}`} </span>
            <Button type='button' title='Logout' onClick={logoutHandler} />
          </>
        );
      }}
    </AuthContext.Consumer>
  );
}
