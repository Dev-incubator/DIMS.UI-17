import { useContext } from 'react';
import { AuthContext } from '../Hooks/useAuth';
import { USER_ROLES } from '../shared/constants';
import { AdminRoutes } from './AdminRoutes';
import { MemberRoutes } from './MemberRoutes';
import { DefaultRoutes } from './DefaultRoutes';

export const Routes = () => {
  const { isAuth, role } = useContext(AuthContext);
  if (isAuth) {
    return role === USER_ROLES.user ? <MemberRoutes /> : <AdminRoutes />;
  }

  return <DefaultRoutes />;
};
