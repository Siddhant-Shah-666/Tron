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
        setIsLoading(true); // Start loading state

        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/users/getuser`, {
                method: "GET",
                credentials: "include",
            });

            // If status is 401 (Unauthorized) or 403, user is not logged in.
            if (!res.ok && res.status >= 400) {
                // Clear any existing state and stop loading
                setUser(null);
                setIsLoggedIn(false);
            } else {
                // Status is 200 (OK) or 304 (Not Modified). Proceed.
                // NOTE: We only parse JSON if the body isn't empty (i.e., not a 304)
                const data = (res.status !== 304 && res.status !== 204) ? await res.json() : {};

                // Use the data if available, otherwise assume current token is valid
                const userData = data?.user || user; 

                if (userData) {
                    setUser(userData);
                    setIsLoggedIn(true);
                    if (userData?.role === "Admin") {
                        setIsAdmin(true);
                    }
                } else {
                    // Token exists but server sent no user data (e.g., expired token)
                    setUser(null);
                    setIsLoggedIn(false);
                }
            }
        } catch (err) {
            // Handle network errors or JSON parsing errors
            console.error("Auth check failed:", err);
            setUser(null);
            setIsLoggedIn(false);
        } finally {
            setIsLoading(false); // Stop loading regardless of the outcome
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
