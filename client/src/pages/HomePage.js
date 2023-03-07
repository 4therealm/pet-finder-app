import React from 'react';
import { useAppCtx } from '../utils/AppContext';
// import PetAside from '../components/PetList';
import Feed from '../components/Feed'
import LostPets from '../components/LostPets';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';


const HomePage = () => {
  const { user, location, setLocation } = useAppCtx()

  return (
    <div>
 {user ? (
        <div style={{border: "2px solid blue"}}className='container-fluid'>
          {/* <h2 className="petaside-greeting">Hello, {user}!</h2> */}

          <Feed />

          <LostPets />
        </div>
      ) : (
        <p>Please log in to see your profile.</p>
      )}
    </div>
  );
};

export default HomePage;
