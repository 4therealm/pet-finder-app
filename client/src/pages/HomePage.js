import React, { useState } from 'react';
import { useAppCtx } from '../utils/AppContext';
// import PetAside from '../components/PetList';
import Feed from '../components/Feed'
import LostPets from '../components/LostPets';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';

const HomePage = () => {
  const { user, location, setLocation } = useAppCtx()

  const [pets, setPets] = useState([]);

  const handleAddPet = (pet) => {
    setPets((pets) => [...pets, pet])
  }

  return (
    <div>
 {user ? (
        <div className='container-fluid'>
          {/* <Feed /> */}
          
          {/* <Link to='/addPetForm' >Add a lost pet</Link> */}
          <h2 style={{textAlign: 'center', color: '#D1BDF2'}}>Lost pets!</h2>
          <div className="col-12" >
            <LostPets />
          </div>


        </div>
      ) : (
        <p>Please log in to see your profile.</p>
      )}
    </div>
  );
};

export default HomePage;
