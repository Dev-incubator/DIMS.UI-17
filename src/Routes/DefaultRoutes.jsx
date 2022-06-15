import { Switch, Route, Redirect } from 'react-router-dom';
import { About } from '../components/Pages/About/About';
import { Presentation } from '../Presentation/Presentation';
import { Login } from '../components/Pages/Login/Login';

export function DefaultRoutes() {
  return (
    <Switch>
      <Route exact path='/presentation' component={Presentation} />
      <Route exact path='/about' component={About} />
      <Route path='/'>
        <Redirect to='/login' />
        <Login />
      </Route>
    </Switch>
  );
}
