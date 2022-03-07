import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { LoginForm } from '../../Forms/LoginForm/LoginForm';

export function Login() {
  const handleClick = async (email, password) => {
    const auth = getAuth();
    const data = await signInWithEmailAndPassword(auth, email, password);
    console.log(data);
  };

  return <LoginForm handleClick={handleClick} />;
}
