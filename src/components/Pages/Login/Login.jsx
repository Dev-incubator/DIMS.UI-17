import { LoginForm } from '../../Forms/LoginForm/LoginForm';
import { Home } from '../Home/Home';
import { AuthContext } from '../../../Hooks/useAuth';

export function Login() {
  return (
    <AuthContext.Consumer>
      {({ isAuth, error, loginHandler }) => {
        return isAuth ? <Home /> : <LoginForm error={error} handleLogin={loginHandler} />;
      }}
    </AuthContext.Consumer>
  );
}
