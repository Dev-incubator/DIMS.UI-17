import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import propTypes from 'prop-types';
import { findUser, getAllUsers } from '../../../services/users-services';
import { LoginForm } from '../../Forms/LoginForm/LoginForm';
import { Home } from '../Home/Home';

export function Login({ handleAuth, isAuth }) {
  const handleLogin = async (email, password) => {
    const auth = getAuth();
    const userData = await signInWithEmailAndPassword(auth, email, password);
    const {
      user: { uid },
    } = userData;
    getAllUsers();
    const { role, name } = await findUser(uid);
    handleAuth(role, name);
  };

  return isAuth ? <Home /> : <LoginForm handleClick={handleLogin} />;
}

Login.propTypes = {
  handleAuth: propTypes.func.isRequired,
  isAuth: propTypes.bool.isRequired,
};
