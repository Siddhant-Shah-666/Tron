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
  const navigate = useNavigate();

  const logout = async () => {
    try {
      const response = await fetch("https://tron-bug-tracking.onrender.com/users/logout", {
        method: "POST",
        credentials:"include",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
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
    fetch("https://tron-bug-tracking.onrender.com/users/getuser", {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data.user?.assignedTickets?.length);

        setUser(data.user);
        if (data.user.role === "Admin") {
          setIsAdmin(true);
        }
      });
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
