import React, { createContext } from 'react';
import PropTypes from 'prop-types';
import { singInEmailAndPassword, singInGoogle, logout } from '../services/auth-services';
import { initialStateAuth } from '../shared/initialStates';

export const AuthContext = createContext(null);

export class AuthProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ...initialStateAuth,
      loginHandler: this.login,
      handleSininWithGoogle: this.singInGoogle,
      logoutHandler: this.logout,
      resetErrorHandler: this.resetError,
    };
  }

  setAuth = (name, role, uid) => {
    if (uid) {
      this.setState((prevState) => ({ ...prevState, name, role, uid, isAuth: true }));
    }
    this.setState({ error: 'user not found' });
  };

  logout = async () => {
    await logout();
    this.setState((prevState) => ({ ...prevState, ...initialStateAuth }));
  };

  login = async (email, password) => {
    const { role, name, uid } = await singInEmailAndPassword(email, password);

    this.setAuth(name, role, uid);
  };

  singInGoogle = async () => {
    const { role, name, uid } = await singInGoogle();

    this.setAuth(name, role, uid);
  };

  resetError = () => {
    this.setState({ error: '' });
  };

  render() {
    const { children } = this.props;

    return <AuthContext.Provider value={this.state}>{children}</AuthContext.Provider>;
  }
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
