import {
  ReactNode,
  FC,
  useState,
  useEffect,
  useContext,
  createContext,
} from "react";
import { Navigate } from "react-router-dom";

interface AuthContextType {
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}

export const DefaultRouteContext = createContext<string>("/login");
const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("token")
  );

  const defaultRoute = isAuthenticated ? "/instructions" : "/login";

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      <DefaultRouteContext.Provider value={defaultRoute}>
        {children}
      </DefaultRouteContext.Provider>
    </AuthContext.Provider>
  );
};

interface PrivateWrapperProps {
  children: React.ReactElement;
}

export const PrivateWrapper: FC<PrivateWrapperProps> = ({ children }) => {
  let authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error("PrivateWrapper must be used within an AuthProvider");
  }

  const { isAuthenticated } = authContext;

  return isAuthenticated ? children : <Navigate to="/login" />;
};
