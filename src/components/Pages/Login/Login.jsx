import { useContext } from 'react';
import { LoginForm } from '../../Forms/LoginForm/LoginForm';
import { AuthContext } from '../../../Hooks/useAuth';

export function Login() {
  const { isAuth } = useContext(AuthContext);

  return isAuth ? null : <LoginForm />;
}
