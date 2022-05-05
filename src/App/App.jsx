import { useContext } from 'react';
import { Container } from 'react-bootstrap';
import { ErrorBoundary } from '../Hooks/ErrorBoundary';
import { StoreContext } from '../Hooks/useStore';
import { Header } from '../components/Common/Header/Header';
import { Footer } from '../components/Common/Footer/Footer';
import { AdminRoutes } from '../Routes/AdminRoutes';
import { MemberRoutes } from '../Routes/MemberRoutes';
import { USER_ROLES } from '../shared/constants';
import { AuthContext } from '../Hooks/useAuth';
import { Login } from '../components/Pages/Login/Login';
import style from './App.module.css';
import { Loader } from '../components/Common/Loader/Loader';

export function App() {
  const { isAuth, role } = useContext(AuthContext);
  const { isFetching } = useContext(StoreContext);

  return (
    <Container className={style.container}>
      {isFetching ? <Loader /> : null}
      {isAuth ? (
        <>
          <Header />
          <ErrorBoundary>
            <main>{role === USER_ROLES.user ? <MemberRoutes /> : <AdminRoutes />}</main>
          </ErrorBoundary>
        </>
      ) : (
        <main>
          <Login />
        </main>
      )}
      <Footer />
    </Container>
  );
}
