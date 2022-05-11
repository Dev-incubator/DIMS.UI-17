import React from 'react';
import { Redirect } from 'react-router-dom';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { Container } from 'react-bootstrap';
import { ErrorBoundary } from '../Hooks/ErrorBoundary';
import { Header } from '../components/Common/Header/Header';
import { Footer } from '../components/Common/Footer/Footer';
import { AdminRoutes } from '../Routes/AdminRoutes';
import { MemberRoutes } from '../Routes/MemberRoutes';
import { USER_ROLES } from '../shared/constants';
import { AuthContext } from '../Hooks/useAuth';
import { Login } from '../components/Pages/Login/Login';
import style from './App.module.css';
import { Loader } from '../components/Common/Loader/Loader';

class App extends React.PureComponent {
  render() {
    const { isFetching } = this.props;

    return (
      <>
        {isFetching ? <Loader /> : null}

        <Container className={style.container}>
          <AuthContext.Consumer>
            {({ isAuth, role }) => {
              if (isAuth) {
                return (
                  <>
                    <Header />
                    <ErrorBoundary>
                      <main>{role === USER_ROLES.user ? <MemberRoutes /> : <AdminRoutes />}</main>
                    </ErrorBoundary>
                  </>
                );
              }

              return (
                <>
                  <Redirect to='/login' />
                  <Login />
                </>
              );
            }}
          </AuthContext.Consumer>
          <Footer />
        </Container>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isFetching: state.loading.isFetching,
  };
};

App.propTypes = {
  isFetching: propTypes.bool.isRequired,
};

export default connect(mapStateToProps, null)(App);
