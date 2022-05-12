import { Switch, Route, Redirect } from 'react-router-dom';
import { Progress } from '../components/Pages/Progress/Progress';
import AllTasks from '../components/Pages/Tasks/AllTasks';
import Tracks from '../components/Pages/Tracks/Tracks';
import { Members } from '../components/Pages/Members/Members';
import Tasks from '../components/Pages/Tasks/Tasks';

export function AdminRoutes() {
  return (
    <Switch>
      <Route exact path='/progress/:id' component={Progress} />
      <Route exact path='/tasks' component={AllTasks} />
      <Route exact path='/tasks/:id' component={Tasks} />
      <Route exact path='/tasks/:id/tracks' component={Tracks} />
      <Route exact path='/members' component={Members} />
      <Redirect from='/' to='/members' />
    </Switch>
  );
}
