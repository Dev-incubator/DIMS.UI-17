import React, { createContext } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { singInGoogle } from '../services/auth-services';
import { initialStateAuth } from '../shared/initialStates';
import { authAPI, setAPIMode } from '../services/api/api';
import { getRoles } from '../shared/helpers/getRole/getRole';
import { loading } from '../store/actionCreators/loadingActionCreators';

export const AuthContext = createContext(null);

class AuthProvider extends React.Component {
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
    const userData = JSON.parse(localStorage.getItem('user'));
    if (!localStorage.getItem('apiMode')) {
      localStorage.setItem('apiMode', 'restAPI');
    }
    this.setState((prevState) => {
      return { ...prevState, apiMode: localStorage.getItem('apiMode') };
    });
    if (userData) {
      const { roles, firstName, userId } = userData;
      this.setAuth(firstName, getRoles(roles), userId);
    }
  }

  setAuth = (firstName, role, userId) => {
    if (userId) {
      this.setState((prevState) => ({ ...prevState, firstName, role, userId, isAuth: true }));
    }
    this.setState({ error: 'user not found' });
  };

  logout = async () => {
    await authAPI.logout();
    this.setState({ ...initialStateAuth, apiMode: localStorage.getItem('apiMode') });
  };

  login = async (email, password) => {
    const { toggleLoading } = this.props;
    toggleLoading(true);
    try {
      const { roles, firstName, userId } = await authAPI.login(email, password);
      this.setAuth(firstName, getRoles(roles), userId);
    } catch (error) {
      this.setState({ error: 'user not found' });
    }
    toggleLoading(false);
  };

  singInGoogle = async () => {
    try {
      const { roles, firstName, userId } = await singInGoogle();
      this.setAuth(firstName, getRoles(roles), userId);
    } catch (error) {
      this.setState({ error: 'user not found' });
    }
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
  toggleLoading: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      toggleLoading: loading,
    },
    dispatch,
  );
};

export default connect(null, mapDispatchToProps)(AuthProvider);
