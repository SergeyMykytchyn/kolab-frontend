import React, { useState, createContext } from "react";

export const UserContext = createContext();

export const UserContextProvider = (props) => {
  const [user, setUser] = useState({});
  const [token, setToken] = useState(localStorage.getItem("TOKEN"));

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        token,
        setToken
      }}>
      { props.children }
    </UserContext.Provider>
  );
};
