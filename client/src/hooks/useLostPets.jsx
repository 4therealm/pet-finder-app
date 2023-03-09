import { useState, useEffect } from "react";

const useLostPets = () => {
  const [lostPets, setLostPets] = useState([]);

  const getLostPets = async () => {
    try {
      const response = await fetch(`/api/pet/lost`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const allLostPets = await response.json();
      return allLostPets;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  useEffect(() => {
    const fetchLostPets = async () => {
      const allLostPets = await getLostPets();
      // console.log(allLostPets);
      if (allLostPets) {
        setLostPets(allLostPets);
      }
    };
    fetchLostPets();
  }, []);

  return { lostPets };
};

export default useLostPets;
