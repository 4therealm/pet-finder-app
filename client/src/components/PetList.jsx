import React,{useState} from "react"
import {useAppCtx} from '../utils/AppContext'


const PetAside=({pets}) => {
  const [selectedPet,setSelectedPet]=useState(null)
  const [modalVisible,setModalVisible]=useState(false)
  const [petInfo,setPetInfo]=useState({})
  const {user, userLocation}=useAppCtx()


  const handlePetButtonClick=async (petId) => {
    // console.log(userLocation);
    // console.log(petId);
    try {
      const response=await fetch(`/api/pet/${petId}`)
      if(!response.ok) {
        throw new Error("Network response was not ok")
      }
      const data=await response.json()
      // console.table(data);
      setPetInfo(data)
      setSelectedPet(petId)
      setModalVisible(true)
    } catch(error) {
      console.log(error)
    }
  }

  const handleModalClose=() => {
    setSelectedPet(null)
    setModalVisible(false)
  }

  const handleLostButtonClicked=async () => {
    console.log("lost button clicked")
    try {
      const response=await fetch(`/api/pet/${selectedPet}`,{
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          isLost: true,
          lastSeenLocation: userLocation,
        }),
      })
      if(!response.ok) {
        throw new Error("Network response for Pet update was not ok")
      }
      const data=await response.json()
      setPetInfo(data)

      // Check if location exists before adding lost pet
      const {lastSeenLocation}=data
      console.log("Last seen location:",lastSeenLocation)
      const locationResponse=await fetch(`/api/location/${lastSeenLocation[0]._id}`)
      if(!locationResponse.ok) {
        throw new Error("Network response for Location lookup was not ok")
      }
      const locationData=await locationResponse.json()
      console.log("Location data:", locationData);

      // Add pet to lostPets array in location document
      const response2=await fetch(`/api/location/lost/${lastSeenLocation[0]._id}`,{
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({petId: data._id}),
      })
      if(!response2.ok) {
        throw new Error("Network response for Location update was not ok")
      }
      const data2=await response2.json()
      console.log("Pet data:",data2)

      window.location.href = `/profile/${user._id}`;

    } catch(error) {
      console.log(error)
    }
  }
  const handleFoundButtonClicked = async () => {
    console.log("found button clicked");
    try {
      const response = await fetch(`/api/pet/found/${selectedPet}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          isLost: false,
          lastSeenLocation: { type: "Point", coordinates: [0, 0] }
        }),
      });
      if (!response.ok) {
        throw new Error("Network response for Pet update was not ok");
      }
      const data = await response.json();
      setPetInfo(data);
  
      // Remove pet from lostPets array in location document
      const { lastSeenLocation } = data;
      console.log("Last seen location:", lastSeenLocation);
      const response2 = await fetch(`/api/location/lost/${lastSeenLocation[0]._id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ petId: data._id }),
      });
      if (!response2.ok) {
        throw new Error("Network response for Location update was not ok");
      }
      const data2 = await response2.json();
      console.log("Pet data:", data2);

      window.location.href = `/profile/${user._id}`;

    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteButtonClicked = async () => {
    console.log("delete button clicked");
    try {
      const deletePet = await fetch(`/api/pet/${selectedPet}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ petId: petInfo._id }),
        });
        if (!deletePet.ok) {
          throw new Error("Pet not found");
        }
        const deletedPet = await deletePet.json();

        console.log("Pet data:", deletedPet);
        window.location.href = `/profile/${user._id}`;
    } catch (err) {
      console.log(err)
    }
  };

  return (
    <aside className="col-8">
      <h2>Pet List</h2>
      <div className="btn-group-vertical">
        {pets.map((pet) => (
            <React.Fragment key={pet._id}>
              <img src={pet.petImageUrl} alt="pet" />
              <button
                key={pet._id}
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => handlePetButtonClick(pet._id)}
              >
                {pet.name}
              </button>
            </React.Fragment>
          ))}
      </div>
      {modalVisible===true&&(
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
                <p>Friendly: {petInfo.friendly? "Yes":"No"}</p>
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
                <button
                  onClick={handleLostButtonClicked}>lost?</button>
                <button
                  onClick={handleFoundButtonClicked}>found?</button>
                <button
                  style={{ backgroundColor: 'red', color: 'white' }}
                  onClick={handleDeleteButtonClicked}>Delete</button>

              </div>
            </div>
          </div>
        </div>
      )}
    </aside>
  )
}

export default PetAside
