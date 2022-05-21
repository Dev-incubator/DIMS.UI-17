import { useContext } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { ErrorBoundary } from '../Hooks/ErrorBoundary';
import { Header } from '../components/Common/Header/Header';
import { Footer } from '../components/Common/Footer/Footer';
import { AuthContext } from '../Hooks/useAuth';
import { Login } from '../components/Pages/Login/Login';
import style from './App.module.css';
import { getRoute } from '../Routes/getRoute';
import { About } from '../components/Pages/About/About';

export function App() {
  const { isAuth, role } = useContext(AuthContext);

  return (
    <Container className={style.container}>
      <Header />
      <ErrorBoundary>
        {isAuth ? (
          <main>{getRoute(role)}</main>
        ) : (
          <main>
            <Switch>
              <Route exact path='/about' component={About} />
              <Route path='/'>
                <Redirect to='/login' />
                <Login />
              </Route>
            </Switch>
          </main>
        )}
      </ErrorBoundary>
      <Footer />
    </Container>
  );
}
