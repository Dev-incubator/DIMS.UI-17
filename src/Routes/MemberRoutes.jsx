import { Switch, Route, Redirect } from 'react-router-dom';
import Tracks from '../components/Pages/Tracks/Tracks';
import UserTasks from '../components/Pages/Tasks/UserTasks';

export function MemberRoutes() {
  return (
    <Switch>
      <Route exact path='/tasks' component={UserTasks} />
      <Route exact path='/tasks/:id/tracks' component={Tracks} />
      <Redirect from='/' to='/tasks' />
    </Switch>
  );
}
