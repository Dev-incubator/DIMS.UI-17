import { LoginForm } from '../../Forms/LoginForm/LoginForm';
import { Home } from '../Home/Home';
import { AuthContext } from '../../../Hooks/useAuth';

export function Login() {
  return (
    <AuthContext.Consumer>
      {({ isAuth }) => {
        return isAuth ? <Home /> : <LoginForm />;
      }}
    </AuthContext.Consumer>
  );
}
