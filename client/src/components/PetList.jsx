import React,{useState} from "react"
import {useAppCtx} from "../utils/AppContext"
import {Button,Modal,Card,Col,Container,Row} from "react-bootstrap"



// const PetAside=({pets}) => {
//   const [selectedPet,setSelectedPet]=useState(null)
//   const [modalVisible,setModalVisible]=useState(false)
//   const [petInfo,setPetInfo]=useState({})
//   const {user, userLocation}=useAppCtx()

const PetAside=({pets}) => {
  const [selectedPet,setSelectedPet]=useState(null)
  const [modalVisible,setModalVisible]=useState(false)
  const [petInfo,setPetInfo]=useState({})
  const {user,userLocation}=useAppCtx()

  const handlePetButtonClick=async (petId) => {
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
      const locationResponse=await fetch(
        `/api/location/${lastSeenLocation[0]._id}`
      )
      if(!locationResponse.ok) {
        throw new Error("Network response for Location lookup was not ok")
      }
      const locationData=await locationResponse.json()
      console.log("Location data:",locationData)

      // Add pet to lostPets array in location document
      const response2=await fetch(
        `/api/location/lost/${lastSeenLocation[0]._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({petId: data._id}),
        }
      )
      if(!response2.ok) {
        throw new Error("Network response for Location update was not ok")
      }

      const data2=await response2.json()
      console.log("Pet data:",data2)

      window.location.href=`/profile/${user._id}`

    } catch(error) {
      console.log(error)

    }
  }



  const handleFoundButtonClicked=async () => {
    console.log("found button clicked")
    try {
      const response=await fetch(`/api/pet/found/${selectedPet}`,{
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          isLost: false,
          lastSeenLocation: {type: "Point",coordinates: [0,0]},
        }),
      })
      if(!response.ok) {
        throw new Error("Network response for Pet update was not ok")
      }
      const data=await response.json()
      setPetInfo(data)

      // Remove pet from lostPets array in location document
      const {lastSeenLocation}=data
      console.log("Last seen location:",lastSeenLocation)
      const response2=await fetch(
        `/api/location/lost/${lastSeenLocation[0]._id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({petId: data._id}),
        }
      )
      if(!response2.ok) {
        throw new Error("Network response for Location update was not ok")
      }
      const data2=await response2.json()
      console.log("Pet data:",data2)

      window.location.href=`/profile/${user._id}`

    } catch(error) {
      console.log(error)
    }
  }


  const handleDeleteButtonClicked=async () => {
    console.log("delete button clicked")
    try {
      const deletePet=await fetch(`/api/pet/${selectedPet}`,{
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({petId: petInfo._id}),
      })
      if(!deletePet.ok) {
        throw new Error("Pet not found")
      }
      const deletedPet=await deletePet.json()

      console.log("Pet data:",deletedPet)
      window.location.href=`/profile/${user._id}`
    } catch(err) {
      console.log(err)
    }
  }



  //   return (
  //     <aside className="col-12 text-center">
  //       <h2>Your Pet List</h2>
  //       <div className="btn-group-vertical">
  //         {pets.map((pet) => (
  //             <div style={cardStyle} key={pet._id}>
  //               <img src={pet.petImageUrl} alt="pet" />
  //               <button
  //                 key={pet._id}
  //                 type="button"
  //                 className="btn btn-rounded btn-dark"
  //                 onClick={() => handlePetButtonClick(pet._id)}
  //               >
  //                 {pet.name}
  //               </button>
  //             </div>
  //           ))}


  //       </div>
  //       {modalVisible === true && (
  //         <div
  //           className="modal show"
  //           tabIndex="-1"
  //           role="dialog"
  //           style={{ display: "block" }}
  //         >
  //           <div className="modal-dialog" role="document">
  //             <div className="modal-content">
  //               <div className="modal-header">
  //                 <h5 className="modal-title">{petInfo.name}</h5>
  //                 <button
  //                   type="button"
  //                   className="btn btn-rounded btn-dark close"
  //                   data-dismiss="modal"
  //                   aria-label="Close"
  //                   onClick={handleModalClose}
  //                 >
  //                   <span aria-hidden="true">&times;</span>
  //                 </button>
  //               </div>
  //               <div className="modal-body">
  //                 <p>Type: {petInfo.type}</p>
  //                 <p>Breed: {petInfo.breed}</p>
  //                 <p>Gender: {petInfo.gender}</p>
  //                 <p>Age: {petInfo.age}</p>
  //                 <p>Size: {petInfo.size}</p>
  //                 <p>Color: {petInfo.color}</p>
  //                 <p>Friendly: {petInfo.friendly ? "Yes" : "No"}</p>
  //                 <p>Health: {petInfo.health}</p>
  //                 <p>Notes: {petInfo.notes}</p>
  //               </div>
  //               <div className="modal-footer">
  //                 <button
  //                   type="button"
  //                   className="btn btn-rounded btn-dark"
  //                   data-dismiss="modal"
  //                   onClick={handleModalClose}
  //                 >
  //                   Close
  //                 </button>

  //                 <button
  //                   onClick={handleLostButtonClicked}>lost?</button>
  //                 <button
  //                   onClick={handleFoundButtonClicked}>found?</button>
  //                 <button
  //                   style={{ backgroundColor: 'red', color: 'white' }}
  //                   onClick={handleDeleteButtonClicked}>Delete</button>


  //               </div>
  //             </div>
  //           </div>
  //         </div>
  //       )}
  //     </aside>
  //   );
  // };
  return (
    <aside className="col-12 text-center">
      <h2>Your Pet List</h2>
      <Container>
        <Row>
          {pets.map((pet) => (
            <Col key={pet._id} className="d-flex justify-content-center">
              <Card style={{
                width: "200px",
                marginBottom: "10px",
                boxShadow: 
                  '5px 5px 10px orange, -5px -5px 10px blue, 0px 0px 10px purple',
                borderRadius: '5px',
                padding: '10px',
                display: 'inline-block',

                textAlign: 'center'
              }}>
                <Card.Img
                  variant="top"
                  src={pet.petImageUrl}
                  alt="pet"
                  style={{height: "200px",objectFit: "cover"}}
                />
                <Card.Body className="p-0">
                  <Button
                    variant="dark"
                    onClick={() => handlePetButtonClick(pet._id)}
                    style={{width: "100%"}}
                  >
                    {pet.name}
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
      {modalVisible===true&&(
        <Modal show={modalVisible} onHide={handleModalClose}>
          <Modal.Header closeButton>
            <Modal.Title>{petInfo.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Type: {petInfo.type}</p>
            <p>Breed: {petInfo.breed}</p>
            <p>Gender: {petInfo.gender}</p>
            <p>Age: {petInfo.age}</p>
            <p>Size: {petInfo.size}</p>
            <p>Color: {petInfo.color}</p>
            <p>Friendly: {petInfo.friendly? "Yes":"No"}</p>
            <p>Health: {petInfo.health}</p>
            <p>Notes: {petInfo.notes}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="dark" onClick={handleModalClose}>
              Close
            </Button>
            <Button onClick={handleLostButtonClicked}>Lost?</Button>
            <Button onClick={handleFoundButtonClicked}>Found?</Button>
            <Button
              style={{backgroundColor: "red",color: "white"}}
              onClick={handleDeleteButtonClicked}
            >
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </aside>
  )
}

export default PetAside
