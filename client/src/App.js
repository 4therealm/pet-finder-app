import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Header, Wrapper, AddPetPage} from "./components";
import { HomePage, LoginPage, ProfilePage, SignupPage } from "./pages";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/global.css";
import {AppProvider} from "./utils/AppContext"
import { StateMachineProvider } from "./utils/stateMachine";

function App() {

  return (
  <AppProvider>
    <StateMachineProvider>
      <BrowserRouter>
        <Wrapper>
          <Header />
            <div className="pt-3 px-4">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/profile/:id" element={<ProfilePage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/addPetPage" element={<AddPetPage />} />
              </Routes>
            </div>
        </Wrapper>
      </BrowserRouter>
    </StateMachineProvider>
  </AppProvider>
  );
}

export default App;

