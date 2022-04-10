import { Container } from 'react-bootstrap';
import { ErrorBoundary } from '../Hooks/ErrorBoundary';
import { Header } from '../components/Common/Header/Header';
import { Footer } from '../components/Common/Footer/Footer';
import { AdminRoutes } from '../Routes/AdminRoutes';
import { MemberRoutes } from '../Routes/MemberRoutes';
import { USER_ROLES } from '../shared/constants';
import { AuthContext } from '../Hooks/useAuth';
import { Login } from '../components/Pages/Login/Login';

export function App() {
  return (
    <Container>
      <AuthContext.Consumer>
        {({ isAuth, role }) => {
          if (isAuth) {
            return (
              <>
                <Header />
                <ErrorBoundary>
                  <main>{role === USER_ROLES.member ? <MemberRoutes /> : <AdminRoutes />}</main>
                </ErrorBoundary>
              </>
            );
          }

          return (
            <main>
              <Login />
            </main>
          );
        }}
      </AuthContext.Consumer>
      <Footer />
    </Container>
  );
}
