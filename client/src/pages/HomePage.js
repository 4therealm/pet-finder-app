import React, { useContext } from 'react';
import { UserContext } from '../App';
import PetAside from '../components/PetList';
import Feed from '../components/Feed'
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';


const HomePage = () => {
  const { user } = useContext(UserContext);

  return (
    <div>
 {user?.name ? (
        <div style={{border: "2px solid blue"}}className='container-fluid'>
          <h2 className="petaside-greeting">Hello, {user.name}!</h2>

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
