import { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { ErrorBoundary } from '../Hooks/ErrorBoundary';
import { Header } from '../components/Common/Header/Header';
import { Footer } from '../components/Common/Footer/Footer';
import { AuthContext } from '../Hooks/useAuth';
import { Login } from '../components/Pages/Login/Login';
import style from './App.module.css';
import { getRoute } from '../Routes/getRoute';

export function App() {
  const { isAuth, role } = useContext(AuthContext);

  return (
    <Container className={style.container}>
      <ErrorBoundary>
        {isAuth ? (
          <>
            <Header />
            <main>{getRoute(role)}</main>
          </>
        ) : (
          <>
            <Redirect to='/login' />
            <main>
              <Login />
            </main>
          </>
        )}
      </ErrorBoundary>
      <Footer />
    </Container>
  );
}
