import React, {
  createContext,
  useState,
  useEffect,
  useMemo,
  useContext,
} from 'react';

export interface UserInterface {
  id?: string;
  name?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
}

interface AuthDataContextInterface {
  user: UserInterface;
  onLogin: (newAuthData: UserInterface) => void;
  onLogout: () => void;
}

export const AuthDataContext = createContext<AuthDataContextInterface | null>(
  null,
);

const initialAuthData = {};

const AuthDataProvider: React.FC = props => {
  const [authData, setAuthData] = useState(initialAuthData);

  useEffect(() => {
    const localAuthData = localStorage.getItem('user');
    const currentAuthData = localAuthData ? JSON.parse(localAuthData) : null;
    if (currentAuthData) {
      setAuthData(currentAuthData);
    }
  }, []);

  const onLogout = () => setAuthData(initialAuthData);

  const onLogin = (newAuthData: UserInterface) => setAuthData(newAuthData);

  const authDataValue: AuthDataContextInterface = useMemo(
    () => ({user: authData, onLogin, onLogout}),
    [authData],
  );

  return <AuthDataContext.Provider value={authDataValue} {...props} />;
};

export const useAuthDataContext = () =>
  useContext(AuthDataContext as React.Context<AuthDataContextInterface>);

export default AuthDataProvider;
