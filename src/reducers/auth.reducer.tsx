import {
  ReactNode,
  FC,
  useState,
  useEffect,
  useContext,
  createContext,
} from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

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
  checkTokenAndLogout();

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

export const PublicWrapper: FC<PrivateWrapperProps> = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext);
  const location = useLocation();

  const publicPaths = [
    "/",
    "/login",
    "/sign-up",
    "/confirm-sign-up",
    "/forget-password",
    "/confirm-forget-password",
  ];

  if (isAuthenticated && publicPaths.includes(location.pathname)) {
    return <Navigate to="/instructions" />;
  }

  return <>{children}</>;
};

function checkTokenAndLogout() {
  const token = localStorage.getItem("token");

  if (!token) {
    return;
  }

  try {
    const decoded: any = jwt_decode(token);

    const current_time = Date.now().valueOf() / 1000;

    if (decoded.exp < current_time) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
  } catch (err) {
    console.log("Error decoding token:", err);
  }
}
