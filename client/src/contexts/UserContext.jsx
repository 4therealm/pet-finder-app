import { createContext, useState, useContext, useEffect } from "react";
import cookie from "js-cookie";


export const UserContext = createContext({});// used to create a context object that stores the current user and user location

export const useUserContext = () => useContext(UserContext);// used to access the context object


export const UserProvider = ({children}) => {
  // the state variables set the user and user location
  // console.log("user context");

 

 
 




  return (
    <UserContext.Provider>
      {children}
    </UserContext.Provider>
  );
};


