import React, { createContext } from 'react';
import PropTypes from 'prop-types';
import { singInGoogle } from '../services/auth-services';
import { initialStateAuth } from '../shared/initialStates';
import { authAPI, setAPIMode } from '../services/api/api';
import { getRoles } from '../shared/helpers/getRole/getRole';

export const AuthContext = createContext(null);

export class AuthProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ...initialStateAuth,
      loginHandler: this.login,
      handleSinginWithGoogle: this.singInGoogle,
      logoutHandler: this.logout,
      resetErrorHandler: this.resetError,
      changeAPIModeHandler: this.changeAPIMode,
    };
  }

  componentDidMount() {
    if (!localStorage.getItem('apiMode')) {
      localStorage.setItem('apiMode', 'restAPI');
    }
    this.setState((prevState) => {
      return { ...prevState, apiMode: localStorage.getItem('apiMode') };
    });
  }

  setAuth = (name, role, uid) => {
    if (uid) {
      this.setState((prevState) => ({ ...prevState, name, role, uid, isAuth: true }));
    }
    this.setState({ error: 'user not found' });
  };

  logout = async () => {
    await authAPI.logout();
    this.setState((prevState) => ({ ...prevState, ...initialStateAuth, apiMode: localStorage.getItem('apiMode') }));
  };

  login = async (email, password) => {
    const { roles, firstName, userId } = await authAPI.login(email, password);

    this.setAuth(firstName, getRoles(roles), userId);
  };

  singInGoogle = async () => {
    const { role, name, uid } = await singInGoogle();

    this.setAuth(name, role, uid);
  };

  resetError = () => {
    this.setState({ error: '' });
  };

  changeAPIMode = (apiMode) => {
    setAPIMode(apiMode);
    this.setState((prevState) => ({ ...prevState, apiMode }));
  };

  render() {
    const { children } = this.props;

    return <AuthContext.Provider value={this.state}>{children}</AuthContext.Provider>;
  }
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
