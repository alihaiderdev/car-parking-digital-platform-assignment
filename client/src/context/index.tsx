import { createContext, ReactNode, useContext } from 'react';
import { useLocalStorage } from '../hooks';
import { IUser } from '../models/user.model';
import { useNavigate } from 'react-router-dom';

type TAuthProviderProps = {
  children: ReactNode;
};

type TAuthContext = {
  login: (user: IUser) => void;
  logout: () => void;
  user: IUser | {};
};

const AuthContext = createContext({} as TAuthContext);

export function useAuthContext() {
  return useContext(AuthContext);
}
export function AuthProvider({ children }: TAuthProviderProps) {
  const [user, setUser] = useLocalStorage('user', {});
  const navigate = useNavigate();

  const login = (user: IUser) => {
    setUser(user);
  };

  const logout = () => {
    setUser({});
    navigate('/login');
  };

  return (
    <AuthContext.Provider
      value={{
        login,
        logout,
        user
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
