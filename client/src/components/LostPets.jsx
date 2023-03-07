
import React,{useState} from "react"
import useLostPets from "../hooks/useLostPets"
import {useAppCtx} from "../utils/AppContext"
import SendSMS  from "./SendSMS"
const LostPets=() => {
  const {lostPets}=useLostPets()
  const [expandedPet,setExpandedPet]=useState(null)
  const [ownerPhone,setOwnerPhone]=useState(null)
  const {user, userLocation}=useAppCtx()
  const handleExpandPet=(petId) => {
    if(petId===expandedPet) {
      setExpandedPet(null)
    } else {
      setExpandedPet(petId)
    }
  }
  const getImage=(petType) => {
    if(petType==="dog") {
      return "https://placedog.net/200/200"
    } else if(petType==="cat") {
      return "https://placekitten.com/200/200"
    } else {
      return "http://lorempixel.com/200/200/animals"
    }
  }

  const handleContactOwner=(e) => {
    setOwnerPhone(e.target.value)
    console.log(ownerPhone)
    e.stopPropagation()
    console.log(
    `${user.name} wants to contact you about your lost pet.\n
    a message will be sent to  ${e.target.value}\n
    the user's location is ${userLocation[0].city}, ${userLocation[0].coordinates}`)
    console.log(e.target.value)
    console.log(userLocation[0].coordinates)
  }


  return (
    <div className="row">
      {lostPets.map((pet) => (
        <div key={pet._id} className="col-md-4 mb-3">
          <div
            className={`card ${expandedPet===pet._id? "expanded":""} lostPetCard`}
            onClick={() => handleExpandPet(pet._id)}
          >
            <div className="card-img-container">
              <img
                src={pet.type==="dog"? "https://place-puppy.com/300x200":"https://placekitten.com/300/200"}
                className="card-img-top"
                alt={pet.name}
              />
            </div>
            <div className="card-body">
              <h5 className="card-title">{pet.name}</h5>

              {expandedPet===pet._id&&(
                <div className="card-expand-content">
                  <p className="card-text">
                    Type: {pet.type}
                    <br />
                    Breed: {pet.breed}
                    <br />
                    Description: {pet.description}
                    <br />
                    Friendly: {pet.friendly? "Yes":"No"}
                    <br />
                    Age: {pet.age}
                    <br />
                    Last Seen Location: {pet.lastSeenLocation[0].city},{" "}
                    {pet.lastSeenLocation[0].coordinates}
                    <br />
                    Owner: {pet.owner.name}
                    <br />
                    <button onClick={handleContactOwner} className="ContactOwnerBtn" value={pet.owner.phone}>contact owner</button>
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
      {ownerPhone&&<SendSMS phone={ownerPhone} />
      }
    </div>
  )
}

export default LostPets
