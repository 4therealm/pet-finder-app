import React, { useState } from 'react';
import { useAppCtx } from '../utils/AppContext';
// import PetAside from '../components/PetList';
import Feed from '../components/Feed'
import LostPets from '../components/LostPets';
import AddPetForm from '../pages/forms/AddPetForm'
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import ImageRecognizer from '../components/ImageRecognition';
import { Routes, Route, Link} from 'react-router-dom';

const HomePage = () => {
  const { user, location, setLocation } = useAppCtx()

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
          <Link to='/addPetForm' >Add a lost pet</Link>
        </div>
      ) : (
        <p>Please log in to see your profile.</p>
      )}
    </div>
  );
};

export default HomePage;
