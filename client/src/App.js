import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserProvider } from "./contexts/UserContext";
import { Header, Wrapper, Geolocation, Feed, lostPets } from "./components";
import { HomePage, LoginPage, ProfilePage, SignupPage } from "./pages";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/global.css";
import LostPets from "./components/LostPets"




function App() {




  return (
    <BrowserRouter>
      <Wrapper>
        <UserProvider   >
          <Header />
          <div className="pt-3 px-4">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/profile/:id" element={<ProfilePage />} />
              <Route path="/signup" element={<SignupPage />} />
            </Routes>
            {/* <Geolocation /> */}
          </div>
          {/* <LostPets /> */}
        </UserProvider>
      </Wrapper>
    </BrowserRouter>
  );
}

export default App;

