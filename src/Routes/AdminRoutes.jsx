import { Switch, Route, Redirect } from 'react-router-dom';
import { Progress } from '../components/Pages/Progress/Progress';
import AllTasks from '../components/Pages/Tasks/AllTasks';
import { Members } from '../components/Pages/Members/Members';
import Tasks from '../components/Pages/Tasks/Tasks';
import { About } from '../components/Pages/About/About';
import { Presentation } from '../Presentation/Presentation';

export function AdminRoutes() {
  return (
    <Switch>
      <Route exact path='/members/:id/progress' component={Progress} />
      <Route exact path='/tasks' component={AllTasks} />
      <Route exact path='/members/:id/tasks' component={Tasks} />
      <Route exact path='/about' component={About} />
      <Route exact path='/members' component={Members} />
      <Route exact path='/presentation' component={Presentation} />
      <Redirect from='/login' to='/members' />
    </Switch>
  );
}
