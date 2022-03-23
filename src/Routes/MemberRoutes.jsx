import { Switch, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Home } from '../components/Pages/Home/Home';
import { Tracks } from '../components/Pages/Tracks/Tracks';
import { UserTasks } from '../components/Pages/Tasks/UserTasks';

export function MemberRoutes({ userId }) {
  return (
    <Switch>
      <Route exact path='/' component={Home} />
      <Route exact path='/tasks'>
        <UserTasks userId={userId} />
      </Route>
      <Route exact path='/tasks/:id/tracks' render={(params) => <Tracks params={params} userId={userId} />} />
    </Switch>
  );
}

MemberRoutes.propTypes = {
  userId: PropTypes.string.isRequired,
};
