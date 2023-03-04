import { useEffect, useState, useContext, createContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import cookie from "js-cookie"
import { Header, Wrapper } from "./components"
import { HomePage, LoginPage, ProfilePage, SignupPage } from "./pages";

import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/global.css'

const UserContext = createContext()
function App() {
  // stateful variable to hold the user object
  const [ user, setUser ] = useState(null)

  const verifyUser = async () => {
    // get the auth-token cookie
    const authCookie = cookie.get("auth-token")
    if( authCookie ){ // if the cookie exists
      const query = await fetch("/api/user/verify", {
        method: "post",
        body: JSON.stringify({}),
        headers: {
          "Content-Type": "application/json",
          "Auth-Token": authCookie
        }
      }) // send the cookie to the server
      const result = await query.json()
      // getting a result back means the user is verified
      // if the query is ok, set the user state
      // console.log(result)
      if( result ){
        setUser(result)
        // console.log(user)
        // console.log(result)
      }
    }
  }
//useEffect is a hook that runs when the component is mounted
  useEffect(() => {
    verifyUser()
  },[])


  

  return (
    <BrowserRouter>
      <Wrapper>
<UserContext.Provider value={{user, setUser}}>
        <Header user={user} verifyUser={verifyUser} />
        <div className="pt-3 px-4">
          <Routes>
            <Route path="/" element={<HomePage user={user} />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/profile/:id" element={<ProfilePage user={user} />} />
            <Route path="/signup" element={<SignupPage />} />
          </Routes>
        </div>
</UserContext.Provider>
      </Wrapper>
    </BrowserRouter>
  );
}

export default App;
export { UserContext }
