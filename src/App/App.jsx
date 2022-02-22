import { useEffect } from 'react';
import { NavLink, Route, Switch } from 'react-router-dom';
import { appTitle } from '../config';
import classes from './App.module.css';
import { Members } from '../pages/members/Members';
import { Progress } from '../pages/members/progress/Progress';
import { UserTasks } from '../pages/members/userTasks/UserTasks';

export const App = () => {
  useEffect(() => {
    document.title = appTitle;
  }, []);

  return (
    <div className={classes.App}>
      <header className={classes.links}>
        <NavLink to='/users'>Members</NavLink>
      </header>
      <Switch>
        <Route path='/users' exact component={Members} />
        <Route path='/progress' component={Progress} />
        <Route path='/tasks/:id' component={UserTasks} />
      </Switch>
    </div>
  );
};
