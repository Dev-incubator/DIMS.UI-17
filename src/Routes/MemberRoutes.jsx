import { Switch, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Home } from '../components/Pages/Home/Home';
import { AllTasks } from '../components/Pages/Tasks/AllTasks';
import { Tracks } from '../components/Pages/Tracks/Tracks';

export function MemberRoutes({ userId }) {
  return (
    <Switch>
      <Route exact path='/' component={Home} />
      <Route exact path='/tasks' component={AllTasks} />
      <Route exact path='/tasks/:id/tracks' render={(params) => <Tracks params={params} userId={userId} />} />
    </Switch>
  );
}

MemberRoutes.propTypes = {
  userId: PropTypes.string.isRequired,
};
