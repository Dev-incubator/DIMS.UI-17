import { Switch, Route, Redirect } from 'react-router-dom';
import Tracks from '../components/Pages/Tracks/Tracks';
import UserTasks from '../components/Pages/Tasks/UserTasks';
import { About } from '../components/Pages/About/About';
import { Presentation } from '../Presentation/Presentation';

export function MemberRoutes() {
  return (
    <Switch>
      <Route exact path='/tasks' component={UserTasks} />
      <Route exact path='/tasks/:id/tracks' component={Tracks} />
      <Route exact path='/about' component={About} />
      <Route exact path='/presentation' component={Presentation} />
      <Route exact path='/login'>
        <Redirect to='/tasks' />
      </Route>
    </Switch>
  );
}
