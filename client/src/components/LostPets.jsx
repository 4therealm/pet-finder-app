import React from "react";
import useLostPets from "../hooks/useLostPets";

const LostPets = () => {
  const { lostPets } = useLostPets();

  return (
    <>
      {lostPets.map((pet) => (
        <div key={pet._id}>
          <h2>Name: {pet.name}</h2>
          <p>Type {pet.type}</p>
          <p>Breed: {pet.breed}</p>
          <p>Description: {pet.description}</p>
          <p>is friendly?{pet.friendly}</p>
          <p>Age: {pet.age}</p>
          <p>last seen location: {pet.lastSeenLocation[0].city}, {pet.lastSeenLocation[0].coordinates}</p>
        </div>
      ))}
    </>
  );
};

export default LostPets;
