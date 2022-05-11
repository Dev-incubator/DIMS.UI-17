import { USER_ROLES } from '../shared/constants';
import { AdminRoutes } from './AdminRoutes';
import { MemberRoutes } from './MemberRoutes';

export const getRoute = (role) => {
  return role === USER_ROLES.user ? <MemberRoutes /> : <AdminRoutes />;
};
