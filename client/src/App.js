import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Header, Wrapper, Feed, Geolocation } from "./components";
import { HomePage, LoginPage, ProfilePage, SignupPage } from "./pages";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/global.css";
import {AppProvider} from "./utils/AppContext"




function App() {

  return (
  <AppProvider>
    <BrowserRouter>
      <Wrapper>
        <Header />
          <Geolocation />
          <div className="pt-3 px-4">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/profile/:id" element={<ProfilePage />} />
              <Route path="/signup" element={<SignupPage />} />
            </Routes>
          </div>
      </Wrapper>
    </BrowserRouter>
  </AppProvider>
  );
}

export default App;

