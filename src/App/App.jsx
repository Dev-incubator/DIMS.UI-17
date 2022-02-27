import { Switch, Route } from 'react-router-dom';
import { Home } from '../components/Home/Home';
import { Members } from '../components/Pages/Members/Members';
import { Tasks } from '../components/Pages/Tasks/Tasks';
import { Progress } from '../components/Pages/Progress/Progress';
import style from './App.module.css';

export const App = () => {
  return (
    <div className={style.content}>
      <Switch>
        <Route exact path='/'>
          <Home />
        </Route>
        <Route path='/members'>
          <Members />
        </Route>
        <Route path='/progress'>
          <Progress />
        </Route>
        <Route exact path='/tasks'>
          <Tasks />
        </Route>
      </Switch>
    </div>
  );
};
