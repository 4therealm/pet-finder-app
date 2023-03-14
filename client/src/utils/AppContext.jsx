import React, { createContext, useContext, useEffect, useState } from "react"
import cookie from "js-cookie"
//the context is used to store the user data
export const AppContext = createContext({})
//the hook is used to get the user data
export const useAppCtx = () => useContext(AppContext)

export const AppProvider = ({children}) => {
  const [ user, setUser ] = useState(null)
  const [userLocation, setUserLocation] = useState()
  const [ ready, setReady ] = useState(false)
  
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
      const foundUser = await query.json()
      setUser(foundUser)
      setReady(true)
    // } else {
    //   window.location.href = '/login';
    // }
  }
}
  
  useEffect(() => {
    console.log("use effect called")
    verifyUser()
  }, [])

  if( !ready ) window.location.href = '/login';


  return (
    <AppContext.Provider value={{ user, userLocation, setUserLocation }}>
      {children}
    </AppContext.Provider>
  )
}