import { AuthContext } from '../../../Hooks/useAuth';
import { Button } from '../../Buttons/Button/Button';

export function Logout() {
  return (
    <AuthContext.Consumer>
      {({ firstName, role, logoutHandler }) => {
        function showUser() {
          return <span>{`${firstName}: ${role} `}</span>;
        }

        return (
          <>
            {showUser()}
            <Button type='button' title='Logout' onClick={logoutHandler} />
          </>
        );
      }}
    </AuthContext.Consumer>
  );
}
