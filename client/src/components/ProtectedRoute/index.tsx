import { useAuthContext } from '../../context';
import { Navigate, Outlet } from 'react-router-dom';
import LayoutComponent from '../Layout';

export interface IProtectedRouteComponentProps {}

export const ProtectedRouteComponent: React.FunctionComponent<IProtectedRouteComponentProps> = (props) => {
  const { user } = useAuthContext();

  return Object.keys(user).length > 0 ? (
    <LayoutComponent>
      <Outlet />
    </LayoutComponent>
  ) : (
    <Navigate to="/login" />
  );
};
