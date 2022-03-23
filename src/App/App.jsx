import { Header } from '../components/Common/Header/Header';
import { Footer } from '../components/Common/Footer/Footer';
import { AdminRoutes } from '../Routes/AdminRoutes';
import { MemberRoutes } from '../Routes/MemberRoutes';
import { USER_ROLES } from '../shared/constants';
import { AuthContext } from '../Hooks/useAuth';
import { Login } from '../components/Pages/Login/Login';

export function App() {
  return (
    <>
      <AuthContext.Consumer>
        {({ isAuth, role, uid }) => {
          if (isAuth) {
            return (
              <>
                <Header />
                <main>
                  {role === USER_ROLES.admin ? <AdminRoutes role={role} userId={uid} /> : <MemberRoutes userId={uid} />}
                </main>
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
    </>
  );
}
