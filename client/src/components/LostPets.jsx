
import React,{useState} from "react"
import useLostPets from "../hooks/useLostPets"
import {useAppCtx} from "../utils/AppContext"

const LostPets=() => {
  const {lostPets}=useLostPets()
  const [expandedPet,setExpandedPet]=useState(null)
  const {user}=useAppCtx()
  console.log(user)
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
                    {/* Owner: {pet.owner[0].name}
                    <br />
                    Phone: {pet.owner[0].phone}
                    <br />
                    Email: {pet.owner[0].email} */}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default LostPets
