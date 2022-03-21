import { Switch, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Home } from '../components/Pages/Home/Home';
import { Tracks } from '../components/Pages/Tracks/Tracks';
import { Tasks } from '../components/Pages/Tasks/Tasks';

export function MemberRoutes({ userId }) {
  console.log('Member routes');

  return (
    <Switch>
      <Route exact path='/' component={Home} />
      <Route exact path='/tasks' component={Tasks} />
      <Route exact path='/tasks/:id/tracks' render={(params) => <Tracks params={params} userId={userId} />} />
    </Switch>
  );
}

MemberRoutes.propTypes = {
  userId: PropTypes.string.isRequired,
};
