import { Switch, Route, Redirect } from 'react-router-dom';
import { Progress } from '../components/Pages/Progress/Progress';
import AllTasks from '../components/Pages/Tasks/AllTasks';
import Tracks from '../components/Pages/Tracks/Tracks';
import { Members } from '../components/Pages/Members/Members';
import Tasks from '../components/Pages/Tasks/Tasks';

export function AdminRoutes() {
  return (
    <Switch>
      <Route exact path='/members/:id/progress' component={Progress} />
      <Route exact path='/tasks' component={AllTasks} />
      <Route exact path='/members/:id/tasks' component={Tasks} />
      <Route exact path='/tasks/:id/tracks' component={Tracks} />
      <Route exact path='/members' component={Members} />
      <Route exact path='/'>
        <Redirect to='/members' />
      </Route>
    </Switch>
  );
}
