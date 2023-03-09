import { useAppCtx } from "../utils/AppContext";

export const usePetList = async (userId) => {
  const { user } = useAppCtx();
  try {
    const response = await fetch(`/api/user/${user.id}`);
    if (!response.ok) {
      throw new Error("Failed to fetch pets");
    }
    const dbPets = await response.json();
    //set the pets state to the data from the database
    return [{dbPets}];
    } catch (error) {
    console.error(error);
  }
};