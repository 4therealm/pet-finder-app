import { useEffect, useState, useMemo, createContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import cookie from "js-cookie";
import { Header, Wrapper, Geolocation } from "./components";
import { HomePage, LoginPage, ProfilePage, SignupPage } from "./pages";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/global.css";

const UserContext = createContext({
  user: null,
  userLocation: null,
  setUser: () => {},
  setUserLocation: () => {},

});


function App() {
  // stateful variable to hold the user object
  const [user, setUser] = useState(null);
  const [userLocation, setUserLocation] = useState(null);

  const verifyUser = async () => {
    // get the auth-token cookie
    const authCookie = cookie.get("auth-token");
    if (authCookie) {
      // if the cookie exists
      const query = await fetch("/api/user/verify", {
        method: "post",
        body: JSON.stringify({}),
        headers: {
          "Content-Type": "application/json",
          "Auth-Token": authCookie,
        },
      }); // send the cookie to the server
      const result = await query.json();
      // getting a result back means the user is verified
      // if the query is ok, set the user state
      if (result) {
        setUser(result);
      }
    }
  };

  // memoized value for UserContext
  const userContextValue = useMemo(() => {
    console.log(user);
    return { user, userLocation, setUser, setUserLocation };
  }, [user, userLocation, setUser, setUserLocation]);

  // useEffect is a hook that runs when the component is mounted
  useEffect(() => {
    verifyUser();
  }, []);



  return (
    <BrowserRouter>
      <Wrapper>
        <UserContext.Provider value={userContextValue}>
          <Header />
          <div className="pt-3 px-4">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/profile/:id" element={<ProfilePage />} />
              <Route path="/signup" element={<SignupPage />} />
            </Routes>
            <Geolocation />
          </div>
        </UserContext.Provider>
      </Wrapper>
    </BrowserRouter>
  );
}

export default App;
export { UserContext };
