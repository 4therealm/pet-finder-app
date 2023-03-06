import React, { useState } from "react";

const PetAside = ({ pets }) => {
  const [selectedPet, setSelectedPet] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [petInfo, setPetInfo] = useState({});

  const handleButtonClick = async (petId) => {
    console.log(petId);
    try {
      const response = await fetch(`http://localhost:3001/api/pet/${petId}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.table(data);
      setPetInfo(data);
      setSelectedPet(petId);
      setModalVisible(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleModalClose = () => {
    setSelectedPet(null);
    setModalVisible(false);
  };

  return (
    <aside className="col-8">
      <h2>Pet List</h2>
      <div className="btn-group-vertical">
        {pets.map((pet) => (
          <button
            key={pet._id}
            type="button"
            className="btn btn-outline-secondary"
            onClick={() => handleButtonClick(pet._id)}
          >
            {pet.name}
          </button>
        ))}
      </div>
      {modalVisible === true && (
        <div className="modal show" tabIndex="-1" role="dialog" style={{display: "block"}} >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{petInfo.name}</h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                  onClick={handleModalClose}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <p>Type: {petInfo.type}</p>
                <p>Breed: {petInfo.breed}</p>
                <p>Gender: {petInfo.gender}</p>
                <p>Age: {petInfo.age}</p>
                <p>Size: {petInfo.size}</p>
                <p>Color: {petInfo.color}</p>
                <p>Friendly: {petInfo.friendly ? "Yes" : "No"}</p>
                <p>Health: {petInfo.health}</p>
                <p>Notes: {petInfo.notes}</p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                  onClick={handleModalClose}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
};

export default PetAside;
