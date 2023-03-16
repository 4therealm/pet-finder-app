import { useEffect, useState } from "react";
import cookie from "js-cookie";
import { UpdateUserForm } from "./forms";
import AddPetForm from "./forms/AddPetForm";
import PetAside from "../components/PetList";
import { useAppCtx } from '../utils/AppContext';
import { useParams } from "react-router-dom";
import { usePetList } from "../hooks/usePetList";

const ProfilePage = () => {
  const [activeForm, setActiveForm] = useState(null);
  const { user } = useAppCtx();
  const { id } = useParams();

  const [loading, setLoading] = useState(false);
  const [pets, setPets] = useState([]);
  
  const authCookie = cookie.get("auth-token")

  useEffect(() => {
    console.log("starting query...")
    const getPetList = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/user/${id}`,{
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Auth-Token": authCookie
          }
        });
        console.log(response)
        if (!response.ok) {
          throw new Error("Failed to fetch pets");
        }
        const data = await response.json();
        console.log(data)
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
    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: 'auto', paddingBottom: '200px'}}>
      <div>
        <PetAside pets={pets} />
        {!activeForm && (
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <button
              className="btn btn-rounded btn-dark"
              onClick={() => setActiveForm("user")}
            >
              Update information
            </button>
          </div>
        )}
        {activeForm === "user" && (
          <div className="UpdateUserForm">
            <UpdateUserForm />
            <button className="btn btn-rounded btn-dark" onClick={handleFormCancel}>
              Cancel
            </button>
          </div>
        )}
  
        {!activeForm && (
          <div className="d-flex flex-column justify-center align-items-center">
            <button
              className="btn btn-rounded btn-dark"
              style={{ alignItems: "center" }}
              onClick={() => setActiveForm("pet")}
            >
              Add Pet
            </button>
          </div>
        )}
  
        {activeForm === "pet" && (
          <>
            <AddPetForm user={user} />
            <button className="btn btn-rounded btn-dark" onClick={handleFormCancel}>
              Cancel
            </button>
          </>
        )}
  
        {loading && <p>Loading...</p>}
      </div>
    </div>
  );
};

export default ProfilePage;
