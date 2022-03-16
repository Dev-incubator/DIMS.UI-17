import React from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import propTypes from 'prop-types';
import { findUser } from '../../../services/users-services ';
import { LoginForm } from '../../Forms/LoginForm/LoginForm';
import { Home } from '../Home/Home';

export class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: '',
    };
  }

  componentDidUpdate(prevProps) {
    const { isAuth } = this.props;
    if (prevProps.isAuth !== isAuth) {
      this.resetError();
    }
  }

  handleLogin = async (email, password) => {
    const { setAuthHandler } = this.props;
    try {
      const auth = getAuth();
      const userData = await signInWithEmailAndPassword(auth, email, password);
      const {
        user: { uid },
      } = userData;
      const { role, name } = await findUser(uid);
      if (role || name) {
        setAuthHandler(role, name, uid);
      } else {
        this.setState({ error: 'user not found' });
      }
    } catch (err) {
      console.log(err);
      this.setState({ error: 'user not found' });
    }
  };

  resetError() {
    this.setState({ error: '' });
  }

  render() {
    const { isAuth } = this.props;
    const { error } = this.state;

    return isAuth ? <Home /> : <LoginForm error={error} handleLogin={this.handleLogin} />;
  }
}

Login.propTypes = {
  setAuthHandler: propTypes.func.isRequired,
  isAuth: propTypes.bool.isRequired,
};
