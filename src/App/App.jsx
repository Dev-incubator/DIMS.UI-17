import { Switch, Route } from 'react-router-dom';
import { Home } from '../components/Home/Home';
import { Members } from '../components/Pages/Members/Members';
import { Tasks } from '../components/Pages/Tasks/Tasks';
import { Progress } from '../components/Pages/Progress/Progress';
import { Header } from '../components/Common/Header/Header';
import { Footer } from '../components/Common/Footer/Footer';
import { Login } from '../components/Pages/Login/Login';
import { Track } from '../components/Pages/Track/Track';

export const App = () => {
  return (
    <>
      <Header />
      <main>
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
          <Route exact path='/track'>
            <Track />
          </Route>
          <Route exact path='/login'>
            <Login />
          </Route>
        </Switch>
      </main>
      <Footer />
    </>
  );
};
