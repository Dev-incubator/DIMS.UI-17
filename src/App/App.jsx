import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Home } from '../components/Pages/Home/Home';
import { Members } from '../components/Pages/Members/Members';
import { Tasks } from '../components/Pages/Tasks/Tasks';
import { AllTasks } from '../components/Pages/Tasks/AllTasks';
import { Progress } from '../components/Pages/Progress/Progress';
import { Header } from '../components/Common/Header/Header';
import { Footer } from '../components/Common/Footer/Footer';
import { Login } from '../components/Pages/Login/Login';
import { Track } from '../components/Pages/Track/Track';

export class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      role: '',
      isAuth: false,
    };
  }

  setAuth = (role, name) => {
    console.log(role, name);
    if (role) {
      this.setState({ name, role, isAuth: true });
    }
  };

  logout = () => {
    this.setState({ name: '', isAuth: false });
  };

  render() {
    const { isAuth, name, role } = this.state;

    return (
      <>
        <Header isAuth={isAuth} userName={name} role={role} handleLogout={this.logout} />
        <main>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/members' render={() => (!isAuth ? <Redirect to='/login' /> : <Members />)} />
            <Route
              exact
              path='/progress/:id'
              render={(params) => (!isAuth ? <Redirect to='/login' /> : <Progress params={params} />)}
            />
            <Route exact path='/tasks' render={() => (!isAuth ? <Redirect to='/login' /> : <AllTasks />)} />
            <Route
              exact
              path='/tasks/:id'
              render={(params) => (!isAuth ? <Redirect to='/login' /> : <Tasks params={params} />)}
            />
            <Route
              exact
              path='/tasks/track/:id'
              render={(params) => (!isAuth ? <Redirect to='/login' /> : <Track params={params} />)}
            />
            <Route exact path='/login' render={() => <Login handleAuth={this.setAuth} isAuth={isAuth} />} />
          </Switch>
        </main>
        <Footer />
      </>
    );
  }
}
