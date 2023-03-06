import { createContext, useState, useContext, useEffect } from "react";
import cookie from "js-cookie";


export const UserContext = createContext({});// used to create a context object that stores the current user and user location

export const useUserContext = () => useContext(UserContext);// used to access the context object


export const UserProvider = ({children}) => {
  // the state variables set the user and user location
  console.log("user context");
  const [user, setUser] = useState(null);
  const [userLocation, setUserLocation] = useState(null);

  const verifyUser = async () => {
    const authCookie = cookie.get("auth-token")
    if( authCookie ){
      const query = await fetch("/api/user/verify", {
        method: "post",
        body: JSON.stringify({}),
        headers: {
          "Content-Type": "application/json",
          "Auth-Token": authCookie
        }
      })
      const result = await query.json()
      if( result ){
        setUser(result)
      }
    }
  }

  useEffect(() => {
    verifyUser()
  },[])





  return (
    <UserContext.Provider value={{user, userLocation, setUserLocation,}}>
      {children}
    </UserContext.Provider>
  );
};


