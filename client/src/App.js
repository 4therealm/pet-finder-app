import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Header, Wrapper, } from "./components";
import { HomePage, LoginPage, ProfilePage, SignupPage } from "./pages";
import ProfileImage from './pages/forms/profileImage';
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/global.css";
import {AppProvider} from "./utils/AppContext"
import AddPetForm from "./pages/forms/AddPetForm";


function App() {

  return (
  <AppProvider>
    <BrowserRouter>
      <Wrapper>
        <Header />
          <div className="pt-3 px-4">
            <Routes>
            {/* <newMenu> */}

              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/profile/:id" element={<ProfilePage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/profileImage" element={<ProfileImage />} />
              <Route path="/addPetForm" element={<AddPetForm />} />
            {/* </newMenu> */}
            </Routes>
          </div>
      </Wrapper>
    </BrowserRouter>
  </AppProvider>
  );
}

export default App;

