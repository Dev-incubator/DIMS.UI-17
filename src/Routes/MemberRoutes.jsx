import { Switch, Route } from 'react-router-dom';
import { Home } from '../components/Pages/Home/Home';
import Tracks from '../components/Pages/Tracks/Tracks';
import UserTasks from '../components/Pages/Tasks/UserTasks';

export function MemberRoutes() {
  return (
    <Switch>
      <Route exact path='/' component={Home} />
      <Route exact path='/tasks' component={UserTasks} />
      <Route exact path='/tasks/:id/tracks' component={Tracks} />
    </Switch>
  );
}
