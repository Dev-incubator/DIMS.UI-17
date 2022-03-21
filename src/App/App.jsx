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
      <Header />
      <main>
        <AuthContext.Consumer>
          {({ isAuth, role, uid }) => {
            if (isAuth) {
              return role === USER_ROLES.admin ? <AdminRoutes userId={uid} /> : <MemberRoutes userId={uid} />;
            }

            return <Login />;
          }}
        </AuthContext.Consumer>
      </main>
      <Footer />
    </>
  );
}
