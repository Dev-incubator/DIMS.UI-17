import React from 'react';
import { Header } from '../components/Common/Header/Header';
import { Footer } from '../components/Common/Footer/Footer';
import { Login } from '../components/Pages/Login/Login';
import { AdminRoutes } from '../Routes/AdminRoutes';
import { MemberRoutes } from '../Routes/MemberRoutes';
import { initialStateAuth } from '../shared/initialStates';
import { USER_ROLES } from '../shared/constants';

export class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialStateAuth;
  }

  setAuthHandler = (role, name, uid) => {
    if (uid) {
      this.setState({ name, role, uid, isAuth: true });
    }
  };

  getRoute() {
    const { role, uid, isAuth } = this.state;
    if (!isAuth) {
      return <Login setAuthHandler={this.setAuthHandler} isAuth={isAuth} />;
    }

    return role === USER_ROLES.admin ? <AdminRoutes userId={uid} /> : <MemberRoutes userId={uid} />;
  }

  logoutHandler = () => {
    this.setState(initialStateAuth);
  };

  render() {
    const { isAuth, name, role } = this.state;

    return (
      <>
        <Header isAuth={isAuth} userName={name} role={role} logoutHandler={this.logoutHandler} />
        <main>{this.getRoute()}</main>
        <Footer />
      </>
    );
  }
}
