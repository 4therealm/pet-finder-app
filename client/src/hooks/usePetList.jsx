import { useState } from "react";

export const usePetList = async (userId) => {
  const [pets, setPets] = useState([]);
  try {
    const response = await fetch(`http://localhost:3001/api/user/${userId}`);
    if (!response.ok) {
      throw new Error("Failed to fetch pets");
    }
    const dbPets = await response.json();
    //set the pets state to the data from the database
    return {dbPets};
    } catch (error) {
    console.error(error);
  }
};