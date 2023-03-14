import React, { useState, useEffect } from "react";
import useLostPets from "../hooks/useLostPets";
import { useAppCtx } from "../utils/AppContext";
import SendSMS from "./SendSMS";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";

const LostPets = () => {
  const { lostPets } = useLostPets();
  const [expandedPet, setExpandedPet] = useState(null);
  const [ownerPhone, setOwnerPhone] = useState(null);
  const { user, userLocation } = useAppCtx();
  const handleExpandPet = (pet) => {
    setOwnerPhone("+1" + pet.owner.phone);

    if (pet._id === expandedPet) {
      setExpandedPet(null);
    } else {
      setExpandedPet(pet._id);
    }
  };
  const getImage = (petType) => {
    if (petType === "dog") {
      return "https://placedog.net/200/200";
    } else if (petType === "cat") {
      return "https://placekitten.com/200/200";
    } else {
      return "http://lorempixel.com/200/200/animals";
    }
  };

  const handleContactOwner = (e) => {
    setOwnerPhone(e.target.value);
    e.stopPropagation();
  };

  return (
    <div className="row">
      {lostPets.map((pet) => (
        <div key={pet._id} className="col-md-3 mb-3">
          <div
            className={`card ${
              expandedPet === pet._id ? "expanded" : ""
            } lostPetCard`}
            onClick={() => handleExpandPet(pet)}
          >
            <div
              className="card-img-container"
             
            >
              <img  style={{
                // height: 400 / 2,
                // width: 400 / 2,
                borderRadius: 800 / 4,
              }}
                src={pet.petImageUrl ? pet.petImageUrl : getImage(pet.type)}
                className="card-img-top"
                alt={pet.name}
              />
            </div>
            <div className="card-body dark ">
              <h5 className="card-title">{pet.name}</h5>

              {expandedPet === pet._id && (
                <div className="card-expand-content">
                  <p className="card-text">
                    Type: {pet.type}
                    <br />
                    Breed: {pet.breed}
                    <br />
                    Description: {pet.description}
                    <br />
                    Friendly: {pet.friendly ? "Yes" : "No"}
                    <br />
                    Age: {pet.age}
                    <br />
                    Last Seen Location: {pet.lastSeenLocation[0].city},{" "}
                    {pet.lastSeenLocation[0].coordinates}
                    <br />
                    Owner: {pet.owner.name}, {pet.owner.phone}
                    <br />
                    <button  style={{
                // height: 400 / 2,
                // width: 400 / 2,
                // borderRadius: 800 / 4,
              }}
                      onClick={handleContactOwner}
                      className="btn btn-rounded btn-dark  ContactOwnerBtn"
                      value={"+1" + pet.owner.phone}
                    >
                      contact owner
                    </button>
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
      {ownerPhone && <SendSMS phone={ownerPhone} />}
    </div>
  );
};

export default LostPets;
