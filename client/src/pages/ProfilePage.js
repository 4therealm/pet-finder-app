import { useContext, useEffect, useState } from "react";
import { UpdateUserForm } from "./forms";
import AddPetForm from "./forms/AddPetForm";
import PetAside from "../components/PetList";
import { UserContext } from "../contexts/UserContext";
import { useParams } from "react-router-dom"

const ProfilePage = () => {
  const [showUserForm, setShowUserForm] = useState(false);
  const [showPetForm, setShowPetForm] = useState(false);
  const [pets, setPets] = useState([]);
  const { user } = useContext(UserContext);
  const {id} = useParams()

  useEffect(() => {
    // console.log(id)
    const getPetList = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/user/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch pets");
        }
        const data = await response.json();
        setPets(data.pets);
        // console.log(data.pets);
      } catch (error) {
        console.error(error);
        // show an error message to the user
      }
    };
    
  
    getPetList();
  }, []);
  

  return (
    <>
      {/* <h1>Hello, {user.name}</h1> */}
      <PetAside pets={pets} />
      {!showUserForm && (
        <button
          className="btn btn-primary"
          onClick={() => setShowUserForm(true)}
        >
          Update information
        </button>
      )}
      {showUserForm && (
        <div className="UpdateUserForm">
          <UpdateUserForm />
          <button
            className="btn btn-primary"
            onClick={() => setShowUserForm(false)}
          >
            Cancel
          </button>
        </div>
      )}

      <h2>Your Pets</h2>
      {!showPetForm && (
        <button
          className="btn btn-primary"
          onClick={() => setShowPetForm(true)}
        >
          Add Pet
        </button>
      )}
      {showPetForm && (
        <>
          <AddPetForm setPets={setPets} pets={pets} />
          <button
            className="btn btn-primary"
            onClick={() => setShowPetForm(false)}
          >
            Cancel
          </button>
        </>
      )}
    </>
  );
};

export default ProfilePage;
