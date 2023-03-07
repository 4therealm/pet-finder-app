import React,{useState} from "react"
import {useAppCtx} from '../../utils/AppContext'


export default function AddPetForm({handleAddPet,setShowPetForm}) {
  const {user}=useAppCtx()
  console.log(user)
const {id}=user
  //this is the state that will be updated when the user changes the input fields in the add pet form
  const [petFormData,setPetFormData]=useState({
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
    owner: id,
  })
  //this is the state that will be updated when the user adds a pet and will be used to display the pets


  const [pets,setPets]=useState([])
  //this is the state that will be updated when the user adds a pet and will be used to display the pets

  const handlePetInputChange=(e) => {
    // console.log(e.target.name, e.target.value)
    setPetFormData({...petFormData,[e.target.name]: e.target.value})
  }

  const handleSubmit=async (event) => {
    event.preventDefault()
    try {
      console.log(petFormData)
      const query=await fetch(`http://localhost:3001/api/user/${user._id}/pet`,{
        method: "post",
        body: JSON.stringify(petFormData),
        headers: {
          "Content-Type": "application/json"
        }
      })
      const result=await query.json()
      console.log(result)
      if(!result) {
        throw new Error("Failed to add pet")
      }
      setPets((Pets) => [...Pets,petFormData]) // add the new pet to the pets array
      setPetFormData({
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
        owner: id,
      })
      setShowPetForm(false)
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
                value={petFormData.name}

                onChange={handlePetInputChange}
              />
            </div>
            <div className="form-group mb-2">
              <label>Type</label>
              <input

                type="text"
                className="form-control"
                name="type"
                value={petFormData.type}

                onChange={handlePetInputChange}
              />
            </div>
            <div className="form-group mb-2">
              <label>Pet Breed</label>
              <input
                type="text"
                className="form-control"
                name="breed"
                value={petFormData.breed}

                onChange={handlePetInputChange}
              />
            </div>
            <div className="form-group mb-2">
              <label>Age</label>
              <input
                type="text"
                className="form-control"
                name="age"
                value={petFormData.age}

                onChange={handlePetInputChange}
              />
            </div>

            <div>
              <label htmlFor="gender">Gender:</label>
              <select name="gender" onChange={handlePetInputChange}>
                <option value="">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label htmlFor="size">Size:</label>
              <select name="size" onChange={handlePetInputChange}>
                <option value="small">Small</option>
                <option value="medium">Medium</option>
                <option value="large">Large</option>
              </select>
            </div>

            <div>
              <label htmlFor="color">Color:</label>
              <input type="text" name="color" onChange={handlePetInputChange} />
            </div>
            <div>
              <label htmlFor="friendly">Friendly:</label>
              <div>
                <input type="radio" id="friendly-yes" name="friendly" value="yes" checked={petFormData.friendly==="yes"} onChange={handlePetInputChange} />
                <label htmlFor="friendly-yes">Yes</label>
              </div>
              <div>
                <input type="radio" id="friendly-no" name="friendly" value="no" checked={petFormData.friendly==="no"} onChange={handlePetInputChange} />
                <label htmlFor="friendly-no">No</label>
              </div>
            </div>

            <div>
              <label htmlFor="health">Health:</label>
              <input type="text" name="health" onChange={handlePetInputChange} />
            </div>
            <div>
              <label htmlFor="notes">Notes:</label>
              <input type="text" name="notes" onChange={handlePetInputChange} />
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