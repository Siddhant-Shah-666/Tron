import react, {
  useContext,
  useEffect,
  useState,
  createContext,
  children,
} from "react";
import { useNavigate } from 'react-router-dom';

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [isloggedIn, setIsLoggedIn] = useState(null);
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const logout = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/users/logout`, {
        method: "POST",
        credentials:"include",
        headers: {
          "Content-Type": "application/json",
        },
      
        body: JSON.stringify({}),
      });

      if (!response.ok) {
        throw new Error("Logout failed");
      }

      setUser(null);
      setIsLoggedIn(false);
      setIsAdmin(false);
      navigate("/");

    } catch (err) {
      console.error("Logout failed:", err);
      setUser(null);
      setIsLoggedIn(false);
      setIsAdmin(false);
      navigate("/");
    }
  };

useEffect(() => {
  const checkAuth = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/users/getuser`, {
        method: "GET",
        credentials: "include",
      });

      if (!res.ok) {
        // setUser(null);
        setIsLoggedIn(false);
        // setIsAdmin(false);
        return;
      }

      const data = await res.json();
      const userData = data?.user;

      if (userData) {
        setUser(userData);
        setIsLoggedIn(true);
        setIsAdmin(userData.role === "Admin");
      } else {
        // setUser(null);
        setIsLoggedIn(false);
        // setIsAdmin(false);
      }
    } catch (err) {
      console.error("Auth check failed:", err);
    
    }
  };

  checkAuth();
}, [isloggedIn]); 


  const login = () => {
    console.log("login triggerded");
    
    setIsLoggedIn(true);
  };

  return (
    <UserContext.Provider value={{ login, isloggedIn, user, isAdmin, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};
