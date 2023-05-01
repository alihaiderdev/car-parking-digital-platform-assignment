import { Link, NavLink } from 'react-router-dom';
import { useAuthContext } from '../../context';
import { Button } from 'antd';

export interface IHeaderComponentProps {}

const HeaderComponent: React.FunctionComponent<IHeaderComponentProps> = (props) => {
  const { user, logout } = useAuthContext();

  const getActiveLinkStyling = (isActive: boolean) => (isActive ? 'text-blue-500 font-semibold text-md' : 'text-black font-semibold text-md');

  return (
    <header className="bg-slate-200 py-4 fixed top-0 z-50 w-full">
      <div className="flex justify-between items-center container mx-auto">
        <div className="logo">
          <Link to={'/'} className="text-xl font-bold">
            Digital Platform Car Parking
          </Link>
        </div>
        <div className="flex items-center justify-between">
          <nav className="mr-8">
            <ul className="flex items-center gap-3">
              <li>
                <NavLink className={({ isActive }) => getActiveLinkStyling(isActive)} to="/parkings">
                  Parkings
                </NavLink>
              </li>
              <li>
                <NavLink className={({ isActive }) => getActiveLinkStyling(isActive)} to="/book-parking">
                  Book Parking
                </NavLink>
              </li>
              <li>
                <NavLink className={({ isActive }) => getActiveLinkStyling(isActive)} to="/bookings">
                  Bookings
                </NavLink>
              </li>
            </ul>
          </nav>
          {Object.keys(user).length > 0 ? (
            <Button type="primary" onClick={logout} size="large">
              Logout
            </Button>
          ) : (
            <Link to={'/login'}>Login/Signup</Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default HeaderComponent;
