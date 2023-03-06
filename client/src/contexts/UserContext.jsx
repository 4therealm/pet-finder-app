import { createContext, useState, useMemo } from "react";

const UserContext = createContext({
  user: null,
  userLocation: null,
  setUser: () => {},
  setUserLocation: () => {},
});

const UserProvider = (props) => {
  const [user, setUser] = useState(null);
  const [userLocation, setUserLocation] = useState(null);

  const userContextValue = useMemo(() => {
    console.log(user);
    return { user, userLocation, setUser, setUserLocation };
  }, [user, userLocation, setUser, setUserLocation]);

  return (
    <UserContext.Provider value={userContextValue}>
      {props.children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
