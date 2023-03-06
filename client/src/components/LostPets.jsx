import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../App";

const getLostPets = async () => {
  try {
    const response = await fetch(`http://localhost:3001/api/pet/lost`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const allLostPets = await response.json();
    console.table(allLostPets);
    return allLostPets;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const LostPets = () => {
  const [selectedPet, setSelectedPet] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [petInfo, setPetInfo] = useState({});
  const { userLocation } = useContext(UserContext);
  const [lostPets, setLostPets] = useState([]);

  useEffect(() => {
    const fetchLostPets = async () => {
      const allLostPets = await getLostPets();
      if (allLostPets) {
        setLostPets(allLostPets);
      }
    };
    fetchLostPets();
  }, []);

  return (
    <div>
      <h1>Lost Pets</h1>
      {lostPets.map((pet) => (
        <div key={pet._id}>
          <h2>{pet.name}</h2>
          <button onClick={() => setSelectedPet(pet)}>View Details</button>
        </div>
      ))}
      {selectedPet && (
        <div>
          <h2>{selectedPet.name}</h2>
          <p>{selectedPet.description}</p>
          <p>Location: {selectedPet.lastSeenLocation}</p>
          <button onClick={() => setModalVisible(true)}>Contact Owner</button>
        </div>
      )}
      {modalVisible && (
        <div>
          <h2>Contact Owner</h2>
          <p>{petInfo.owner.email}</p>
          <button onClick={() => setModalVisible(false)}>Close</button>
        </div>
      )}
    </div>
  );
};

export default LostPets;