import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import propTypes from 'prop-types';
import { LoginForm } from '../../Forms/LoginForm/LoginForm';
import { Home } from '../Home/Home';

export function Login({ handleAuth, isAuth }) {
  const handleLogin = async (email, password) => {
    const auth = getAuth();
    const userData = await signInWithEmailAndPassword(auth, email, password);
    const {
      user: { userEmail = email },
    } = userData;

    handleAuth(userEmail);
  };

  return isAuth ? <Home /> : <LoginForm handleClick={handleLogin} />;
}

Login.propTypes = {
  handleAuth: propTypes.func.isRequired,
  isAuth: propTypes.bool.isRequired,
};
