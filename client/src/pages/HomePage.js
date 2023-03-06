import React, { useContext } from 'react';
import { useAppCtx } from '../utils/AppContext';
import PetAside from '../components/PetList';
import Feed from '../components/Feed'
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';


const HomePage = () => {
  const { user, location, setLocation } = useAppCtx()

  return (
    <div>
 {user ? (
        <div style={{border: "2px solid blue"}}className='container-fluid'>
          <p>logged in</p>
          {/* <h2 className="petaside-greeting">Hello, {user}!</h2> */}

          <Feed />

          {/* ! Currently the pets are throwing an error when I have them shown here, but this code is ready! */}
          {/* <PetAside /> */}
        </div>
      ) : (
        <p>Please log in to see your profile.</p>
      )}
    </div>
  );
};

export default HomePage;
