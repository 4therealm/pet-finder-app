import React,{useEffect, useState} from "react"
import {useAppCtx} from '../../utils/AppContext'
import { Image } from 'cloudinary-react';
import Axios from 'axios';
import cloudinary from 'cloudinary-core';
import ImageRecognizer from "../../components/ImageRecognition";

//! Add the following to any component to use:
    /* <AddPetForm handleAddPet={handleAddPet} /> */

export default function AddPetForm({handleAddPet, setShowPetForm}) {
  const [nameError, setNameError] = useState("");
const [typeError, setTypeError] = useState("");
const [friendlyError, setFriendlyError] = useState("");
  //We need to manage the state of the image
  const [imageSelected, setImageSelected] = useState('');

  //The full path to the Cloudinary Website
  const cld = new cloudinary.Cloudinary({cloud_name: 'diwhrgwml'});

  //Grabbing the 'user' Model from AppContext.jsx
  const {user}=useAppCtx()

  console.log(user._id)

  //Assigning the uses id to 'id' for ease
const [id,setId]=useState("")

  //State for displaying the URL for the pet image
  const [petUrl, setPetUrl] = useState(null);

  //Responsible for uploading the image
  const uploadImage = async () => {
    try {
      console.log("Test for upload image")
        //We need to use 'fromData' for the image in order to upload it
        const formData = new FormData();
        formData.append("file", imageSelected);

        //The following is standard for Cloudinary
        formData.append("upload_preset", "fxbnekpl");
    
        const response = await Axios.post("https://api.cloudinary.com/v1_1/diwhrgwml/image/upload", formData);

        //getting the image_id (aka public_id)
        const publicId = response.data.public_id;

        //Returning the full url of the image from Cloudinary
        console.log(cld.url(publicId))
        return cld.url(publicId);
    } catch (err) {
        console.log(err);
    }
}

  //This is the state that will be updated when the user changes the input fields in the add pet form
  //! Note how we do not include the 'owner' field here, even though it is required. We add it in later by hand/force
  const [newPet,setNewPet]=useState({
    name: "",
    type: "",
    breed: "",
    description: "",
    age: "",
    gender: "",
    size: "small",
    color: "",
    friendly: "",
    health: "",
    notes: "",
    petImageUrl: ""
  })

  //The function that activates when the user clicks "Add Pet"
  const handleSubmit = async (event) => {
    event.preventDefault()

    //validate name field
    if (!newPet.name) {
      setNameError("Please enter a pet name");
      return;
    } else {
      setNameError("");
    }

    //Validate type field
    if (!newPet.type) {
      setTypeError("Please enter a pet type");
      return;
    } else {
      setTypeError("");
    }

    //validate friendly field
    if (!newPet.friendly) {
      setFriendlyError("Please select a friendly value");
      return;
    } else {
      setFriendlyError("");

  }

    try {
      const petImageUrl = await uploadImage(); // Wait for the image to upload. We need to do this to get all the data from the user before we begin to add it to the model
      setPetUrl(cld.url(petImageUrl));
      console.log(cld.url(petImageUrl))
      const updatedNewPet = {
        ...newPet,
        owner: id,
        petImageUrl: petImageUrl,
      };
      setNewPet(updatedNewPet);

      //Adding a pet to the user who is logged in
      const query=await fetch(`/api/user/pet/${id}`, {
        method: "post",
        body: JSON.stringify({newPet: updatedNewPet}), //We need to include all the necessary data in the body
        headers: {
          "Content-Type": "application/json"
        }
      })

      const result=await query.json()

      //Just checking to see the final result of the Pet object
      console.log(result)
      if(!result) {
        throw new Error("Failed to add pet")
      }

      //Resetting the fields when/if the user wants to add another pet
      setNewPet({
        name: "",
        type: "",
        breed: "",
        description: "",
        age: "",
        gender: "",
        size: "",
        color: "",
        friendly: "",
        health: "",
        notes: "",
        petImageUrl: ""
      });
      //Updating the HomePage state
      // handleAddPet(result)

      //Setting the current local state to the image url
      setPetUrl(cld.url(petImageUrl))

    }catch(error) {
      console.error(error)
    }
  }

  useEffect(() => {
    user &&setId(user._id)
  }, [user])


  return (
    <div className="d-flex justify-content-evenly align-items-start">
      <div className="AddPetForm col-4 100vw d-flex justify-content-center" style={{border: "solid blue 2px"}}>
        <div className="row">
          <div style={{margin: "0px auto"}}>

            <form onSubmit={handleSubmit} className="mb-2">
              <div className="form-group">
                <label>Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={newPet.name}
                  onChange={(event) => setNewPet({
                    ...newPet,
                    name: event.target.value
                  })}
                />
                {nameError && (
                  <div className="invalid-feedback">{nameError}</div>
                )}
              </div>

              <div className="form-group mb-2">
                <label>Type</label>
                <input

                  type="text"
                  className={`form-control ${typeError ? "is-invalid" : ""}`}
                  name="type"
                  value={newPet.type}
                  onChange={(event) => setNewPet({
                    ...newPet,
                    type: event.target.value
                  })}
                />
                {typeError && (
                  <div className="invlaid-feedback"> {typeError} </div>
                )}
              </div>
              <div className="form-group mb-2">
                <label>Pet Breed</label>
                <input
                  type="text"
                  className="form-control"
                  name="breed"
                  value={newPet.breed}
                  onChange={(event) => setNewPet({
                    ...newPet,
                    breed: event.target.value
                  })}
                />
              </div>
              <div className="form-group mb-2">
                <label>Age</label>
                <input
                  type="text"
                  className="form-control"
                  name="age"
                  value={newPet.age}
                  onChange={(event) => setNewPet({
                    ...newPet,
                    age: event.target.value
                  })}
                />
              </div>

              <div>
                <label htmlFor="gender">Gender:</label>
                <select name="gender" 
                onChange={(event) => setNewPet({
                  ...newPet,
                  gender: event.target.value
                })}
                >
                  <option value="">Select</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label htmlFor="size">Size:</label>
                <select name="size" 
                onChange={(event) => setNewPet({
                    ...newPet,
                    size: event.target.value
                  })}>
                  <option value="small">Small</option>
                  <option value="medium">Medium</option>
                  <option value="large">Large</option>
                </select>
              </div>

              <div>
                <label htmlFor="color">Color:</label>
                <input type="text" name="color" 
                onChange={(event) => setNewPet({
                    ...newPet,
                    color: event.target.value
                  })} />
              </div>
              <div>
                <label htmlFor="friendly">Friendly:</label>
                <div>
                  <input type="radio" id="friendly-yes" name="friendly" value="yes" checked={newPet.friendly==="yes"} onChange={(event) => setNewPet({
                    ...newPet,
                    friendly: event.target.value
                  })} />
                  <label htmlFor="friendly-yes">Yes</label>
                </div>
                <div>
                  <input type="radio" id="friendly-no" name="friendly" value="no" checked={newPet.friendly==="no"} 
                  onChange={(event) => setNewPet({
                    ...newPet,
                    friendly: event.target.value
                  })} />
                  <label htmlFor="friendly-no">No</label>
                </div>
              </div>
              {friendlyError && (
                <div className="invalid-feedback">{friendlyError} </div>
              )}
              <div>
                <label htmlFor="health">Health:</label>
                <input type="text" name="health" onChange={(event) => setNewPet({
                    ...newPet,
                    health: event.target.value
                  })} />
              </div>
              <div>
                <label htmlFor="notes">Notes:</label>
                <input type="text" name="notes" 
                onChange={(event) => setNewPet({
                  ...newPet,
                  notes: event.target.value
                })} />
              </div>

              <div style={{color: "white"}}>
                <input type="file" onChange={(event) => setImageSelected(event.target.files[0])}/>

                {/* If the petImage exists (if it was successfully uploaded), display the image */}
                {petUrl && <Image style={{width: "200px"}} cloudName="diwhrgwml" publicId={petUrl}/>}
              </div>

              <button type="submit" className="btn btn-primary mt-2">
                Add Pet
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="col-5 align-items-start" style={{border: "2px solid blue", textAlign: 'center'}}>
         <h2>Need a reminder of the breed? No worries, click here!</h2>
         <ImageRecognizer />
      </div>
    </div>
  )
}            