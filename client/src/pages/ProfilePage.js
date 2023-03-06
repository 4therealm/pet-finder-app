import { useEffect, useState } from "react";
import { UpdateUserForm } from "./forms";
import AddPetForm from "./forms/AddPetForm";
import PetAside from "../components/PetList";
import { useAppCtx } from '../utils/AppContext';
import { useParams } from "react-router-dom";

const ProfilePage = () => {
  const [activeForm, setActiveForm] = useState(null);
  const { user } = useAppCtx();
  const { id } = useParams();

  const [loading, setLoading] = useState(false);
  const [pets, setPets] = useState([]);

  useEffect(() => {
    const getPetList = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:3001/api/user/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch pets");
        }
        const data = await response.json();
        setPets(data.pets);
      } catch (error) {
        console.error(error);
        // show an error message to the user
      } finally {
        setLoading(false);
      }
    };

    getPetList();
  }, [id]);

  const handleFormCancel = () => {
    setActiveForm(null);
  };

  return (
    <>
      <PetAside pets={pets} />
      {!activeForm && (
        <button
          className="btn btn-primary"
          onClick={() => setActiveForm("user")}
        >
          Update information
        </button>
      )}
      {activeForm === "user" && (
        <div className="UpdateUserForm">
          <UpdateUserForm />
          <button className="btn btn-primary" onClick={handleFormCancel}>
            Cancel
          </button>
        </div>
      )}

      <h2>Your Pets</h2>
      {!activeForm && (
        <button
          className="btn btn-primary"
          onClick={() => setActiveForm("pet")}
        >
          Add Pet
        </button>
      )}
      {activeForm === "pet" && (
        <>
          <AddPetForm />
          <button className="btn btn-primary" onClick={handleFormCancel}>
            Cancel
          </button>
        </>
      )}

      {loading && <p>Loading...</p>}
    </>
  );
};

export default ProfilePage;
