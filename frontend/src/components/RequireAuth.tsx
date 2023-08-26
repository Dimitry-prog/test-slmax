import { Navigate, Outlet, useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';

const RequireAuth = () => {
  const token = Cookies.get('jwt');
  const location = useLocation();

  return token ? (
    <Outlet />
  ) : (
    <Navigate to="/signup" replace state={{ pathname: location.pathname }} />
  );
};

export default RequireAuth;
