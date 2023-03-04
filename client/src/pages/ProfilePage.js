import { useEffect, useState } from "react";
import { UpdateUserForm } from "./forms";
import AddPetForm from "./forms/AddPetForm"

const ProfilePage = ({ user }) => {
  const [showUserForm, setShowUserForm] = useState(false); //this is the state that will be updated when the user clicks the edit button and will be used to toggle the edit form
  const [showPetForm, setShowPetForm] = useState(false); //this is the state that will be updated when the user clicks the add pet button and will be used to toggle the add pet form
  const [pets, setPets] = useState([])//this is the state that will be updated when the user adds a pet and will be used to display the pets
  return (
    <>
      <h1>Your Profile</h1>
      {!showUserForm && (
        <button
          className="btn btn-primary"
          onClick={() => setShowUserForm(true)}
        >
          Edit
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
