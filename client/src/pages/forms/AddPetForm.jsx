import React,{useState} from "react"
import {useAppCtx} from '../../utils/AppContext'
import { Image } from 'cloudinary-react';
import Axios from 'axios';
import cloudinary from 'cloudinary-core';


export default function AddPetForm({handleAddPet, setShowPetForm}) {
  //We need to manage the state of the image
  const [imageSelected, setImageSelected] = useState('');

  //The full path to the Cloudinary Website
  const cld = new cloudinary.Cloudinary({cloud_name: 'diwhrgwml'});

  //Grabbing the 'user' Model from AppContext.jsx
  const {user}=useAppCtx()

  //Assigning the uses id to 'id' for ease
  const id=user._id


  const [petUrl, setPetUrl] = useState(null);

  //Responsible for uploading the image
  const uploadImage = async () => {
    try {
        const formData = new FormData();
        formData.append("file", imageSelected);
        formData.append("upload_preset", "fxbnekpl");
    
        const response = await Axios.post("https://api.cloudinary.com/v1_1/diwhrgwml/image/upload", formData);
        const publicId = response.data.public_id;
        console.log(`Image uploaded successfully! public_id: ${publicId}`);
        return cld.url(publicId);
    } catch (err) {
        console.log(err);
    }
}


  //this is the state that will be updated when the user changes the input fields in the add pet form
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


  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const petImageUrl = await uploadImage(); // Wait for the image to upload
      setNewPet({
        ...newPet,
        owner: id,
        petImageUrl: petImageUrl // Update the petImageUrl state with the uploaded image URL
      });

      console.log({...newPet, petImageUrl})
      console.log(id);
      const query=await fetch(`http://localhost:3001/api/user/pet/${id}`,{
        method: "post",
        body: JSON.stringify({...newPet, owner: id, petImageUrl}), // Include the uploaded image URL
        headers: {
          "Content-Type": "application/json"
        }
      })
      const result=await query.json()
      console.log(result)
      if(!result) {
        throw new Error("Failed to add pet")
      }
      // setPets((Pets) => [...Pets,petFormData]) // add the new pet to the pets array
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
      handleAddPet(result)

      setPetUrl(cld.url(petImageUrl))
      console.log(petUrl)
    } catch(error) {
      console.error(error)
    }
  }

  return (
    <div className="AddPetForm">
      <div className="row">
        <div className="col-6">

          <form onSubmit={handleSubmit} className="mb-2">
            <div className="form-group mb-2">
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
            </div>
            <div className="form-group mb-2">
              <label>Type</label>
              <input

                type="text"
                className="form-control"
                name="type"
                value={newPet.type}
                onChange={(event) => setNewPet({
                  ...newPet,
                  type: event.target.value
                })}
              />
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

            <div style={{border: "2px solid red", color: "white"}}>
              <div >Test?</div>
              <input type="file" onChange={(event) => setImageSelected(event.target.files[0])}/>
              {/* <button onClick={uploadImage}>Upload Image</button> */}

              {/* <Image style={{width: "200px"}} cloudName="diwhrgwml" publicId="https://res.cloudinary.com/diwhrgwml/image/upload/v1678210889/ngigb7ymkblvjr3topyh.png"/> */}

              {petUrl && <Image style={{width: "200px"}} cloudName="diwhrgwml" publicId={petUrl}/>}

            </div>

            <button type="submit" className="btn btn-primary mt-2">
              Add Pet
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}