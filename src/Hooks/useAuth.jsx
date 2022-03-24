import React, { createContext } from 'react';
import PropTypes from 'prop-types';
import { findUser } from '../services/auth-services';
import { initialStateAuth } from '../shared/initialStates';

export const AuthContext = createContext(null);

export class AuthProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ...initialStateAuth,
      loginHandler: this.login,
      logoutHandler: this.logout,
      resetErrorHandler: this.resetError,
    };
  }

  setAuth = (name, role, uid) => {
    this.setState((prevState) => ({ ...prevState, name, role, uid, isAuth: true }));
  };

  logout = () => {
    this.setState((prevState) => ({ ...prevState, ...initialStateAuth }));
  };

  login = async (email, password) => {
    try {
      const { role, name, uid } = await findUser(email, password);
      if (uid) {
        this.setAuth(name, role, uid);
      } else {
        this.setState({ error: 'user not found' });
      }
    } catch (err) {
      console.error(err);
      this.setState({ error: 'user not found' });
    }
  };

  resetError() {
    this.setState({ error: '' });
  }

  render() {
    const { children } = this.props;

    return <AuthContext.Provider value={this.state}>{children}</AuthContext.Provider>;
  }
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
