import React, { useContext } from 'react';
import { UserContext } from '../App';

const HomePage = () => {
  const { user } = useContext(UserContext);

  return (
    <div>
 {user?.name ? (
        <h2>Hello, {user.name}!</h2>
      ) : (
        <p>Please log in to see your profile.</p>
      )}
    </div>
  );
};

export default HomePage;
