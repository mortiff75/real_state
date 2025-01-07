/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";

export const authContext = createContext({
  currentUser: null,
  updateUser: () => {},
});

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const updateUser = (data) => {
    setUser(data);
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <authContext.Provider value={{ currentUser, updateUser }}>
      {children}
    </authContext.Provider>
  );
};
