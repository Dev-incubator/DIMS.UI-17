import { Link } from 'react-router-dom';
import { AuthContext } from '../../../Hooks/useAuth';
import { Button } from '../../Buttons/Button/Button';
import style from './Logout.module.css';

export function Logout() {
  return (
    <AuthContext.Consumer>
      {({ firstName, role, logoutHandler }) => {
        function showUser() {
          return <span className={style.user}>{`${firstName}: ${role} `}</span>;
        }

        return (
          <>
            {showUser()}
            <Link to='/login'>
              <Button type='button' title='Logout' onClick={logoutHandler} />
            </Link>
          </>
        );
      }}
    </AuthContext.Consumer>
  );
}
