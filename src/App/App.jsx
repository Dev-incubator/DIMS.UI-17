import { useContext } from 'react';
import { Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';
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
import { getIsFetching } from '../store/selectors/selectors';

export function App() {
  const { isAuth, role } = useContext(AuthContext);
  const { isFetching } = useContext(StoreContext);
  const isFetchingRedux = useSelector(getIsFetching);

  return (
    <Container className={style.container}>
      {isFetching || isFetchingRedux ? <Loader /> : null}
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
