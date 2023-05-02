import { Navigate, Route, Routes } from 'react-router-dom';
import { ProtectedRouteComponent } from './components/ProtectedRoute';
import LoginScreen from './screens/Login';
import SignupScreen from './screens/Signup';
import PageNotFoundScreen from './screens/PageNotFound';
import ParkingsScreen from './screens/Parkings';
import BookedParkingScreen from './screens/BookedParking';
import BookingScreen from './screens/Bookings';
import { useAuthContext } from './context';
import { AuthVerify } from './utils';
import FormLayoutComponent from './components/FormLayout';

export interface IAppProps {}

const App: React.FunctionComponent<IAppProps> = (props) => {
  const { user, logout } = useAuthContext();

  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate replace to={`${Object.keys(user).length > 0 ? '/parkings' : '/login'}`} />} />

        <Route element={<ProtectedRouteComponent />}>
          <Route index path="parkings" element={<ParkingsScreen />} />
          <Route path="book-parking" element={<BookedParkingScreen />} />
          <Route path="bookings" element={<BookingScreen />} />
        </Route>
        <Route
          path="register"
          element={
            <FormLayoutComponent formTitle="Register">
              <SignupScreen />
            </FormLayoutComponent>
          }
        />
        <Route
          path="login"
          element={
            <FormLayoutComponent>
              <LoginScreen />
            </FormLayoutComponent>
          }
        />

        <Route path="*" element={<PageNotFoundScreen />} />
      </Routes>
      <AuthVerify logout={logout} />
    </>
  );
};

export default App;
