import {
  ReactNode,
  FC,
  useState,
  useEffect,
  useContext,
  createContext,
} from "react";
import { useNavigate } from "react-router-dom";

interface AuthContextType {
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>> | undefined;
}

export const DefaultRouteContext = createContext<string>(
  !!localStorage.getItem("token") ? "/instructions" : "/login"
);
export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  setIsAuthenticated: undefined,
});

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
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  if (!authContext) {
    throw new Error("PrivateWrapper must be used within an AuthProvider");
  }

  const { isAuthenticated, setIsAuthenticated } = authContext;

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      setIsAuthenticated && setIsAuthenticated(true);
    } else if (!isAuthenticated) {
      navigate("/login");
    }
    /* eslint-disable-next-line */
  }, [isAuthenticated]);

  return isAuthenticated ? children : null;
};
