import { Switch, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Home } from '../components/Pages/Home/Home';
import { Progress } from '../components/Pages/Progress/Progress';
import { AllTasks } from '../components/Pages/Tasks/AllTasks';
import { Tracks } from '../components/Pages/Tracks/Tracks';
import { Members } from '../components/Pages/Members/Members';
import { Tasks } from '../components/Pages/Tasks/Tasks';

export function AdminRoutes({ userId }) {
  console.log('admin routes');

  return (
    <Switch>
      <Route exact path='/' component={Home} />
      <Route exact path='/progress/:id' component={Progress} />
      <Route exact path='/members' component={Members} />
      <Route exact path='/tasks' component={AllTasks} />
      <Route exact path='/tasks/:id' component={Tasks} />
      <Route exact path='/tasks/:id/tracks' render={(params) => <Tracks params={params} userId={userId} />} />
    </Switch>
  );
}

AdminRoutes.propTypes = {
  userId: PropTypes.string.isRequired,
};
