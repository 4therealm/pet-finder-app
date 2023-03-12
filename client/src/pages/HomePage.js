import React, { useState } from 'react';
import { useAppCtx } from '../utils/AppContext';
import { Routes, Route, Link } from "react-router-dom";

// import PetAside from '../components/PetList';
import Feed from '../components/Feed'
import LostPets from '../components/LostPets';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import AddPetPage from '../components/AddPetPage';
import { useStateMachineContext } from "../utils/stateMachine";



const HomePage = () => {
  const { user, location, setLocation } = useAppCtx()

  const { stateMachine } = useStateMachineContext();

  const { currentState } = stateMachine.state;

  const actionButton = {
      initial: {
          text: 'Load Model',
          action: () => stateMachine.next()
      },
      loadingModel: {
          text: 'Loading Model...',
          action: null
      },
      modelReady: {
          text: 'Identify Image',
          action: () => stateMachine.next()
      },
      imageReady: {
          text: 'Identifying...',
          action: null
      },
      identifying: {
          text: 'Identifying...',
          action: null
      },
      complete: {
          text: 'Identify Another Image',
          action: () => stateMachine.next()
      }
  };

  const [pets, setPets] = useState([]);

  const handleAddPet = (pet) => {
    setPets((pets) => [...pets, pet])
  }

  return (
    <div>
 {user ? (
        <div style={{border: "2px solid blue"}}className='container-fluid'>

          <Feed />
          <LostPets />
            <Link to="/addPetPage">Add Pet</Link>
            <Routes>
              <Route path="/addPetPage" element={<AddPetPage />} />
            </Routes>
        </div>
        
      ) : (
        <p>Please log in to see your profile.</p>
      )}
    </div>
  );
};

export default HomePage;
