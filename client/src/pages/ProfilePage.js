import { useEffect, useState } from "react"

const ProfilePage = ({user}) => {
  const [ userFormData, setUserFormData ] = useState({ email: "", password: "", name: "", location: "" }) //this is the state that will be updated when the user changes the input fields
  const [ userUpdateResult, setUserUpdateResult ] = useState("") //this is the state that will be updated when the user updates their profile information and will be used to trigger the useEffect hook
  const [showUserForm, setShowUserForm] = useState(false) //this is the state that will be updated when the user clicks the edit button and will be used to toggle the edit form

  const [petFormData, setPetFormData] = useState('')//this is the state that will be updated when the user changes the input fields in the add pet form
  const [showPetForm, setShowPetForm] = useState(false)//this is the state that will be updated when the user clicks the add pet button and will be used to toggle the add pet form
  const [pets, setPets] = useState([])//this is the state that will be updated when the user adds a pet and will be used to display the pets


//the handleUserInputChange function is used to update the userFormData state
  const handleUserInputChange = (e) => {
    // console.log(e.target.name, e.target.value)
    setUserFormData({...userFormData, [e.target.name]: e.target.value})
  }
  const handlePetInputChange = (e) => {
    // console.log(e.target.name, e.target.value)
    setPetFormData({...petFormData, [e.target.name]: e.target.value})
  }


  
  const handleAddPet = (newPet) => {
    setPets([...pets, newPet]);
    setShowPetForm(false);
  };

  const updateUser = async (e) => {
    e?.preventDefault()
    const resp = await fetch(`/api/user/${user._id}`, {
      method: "PUT",
      body: JSON.stringify(userFormData),
      headers: {
        "Content-Type": "application/json"
      }
    })
    if( !resp.ok ){
      return setUserUpdateResult("fail")
    }
    console.log(resp)
    setUserUpdateResult("success")
    setShowUserForm(false)
  }

  useEffect(() => {
    if( user ) setUserFormData({ ...userFormData, email: user.email, name: user.name, location: user.location })
  }, [user])

  return (
    <>
      <h1>Your Profile</h1>
{!showUserForm && (
  
           <button className="btn btn-primary" onClick={() => setShowUserForm(true)}>Edit</button>
    )}
      {showUserForm && (
        <div className="row">
          <div className="col-6">
            <h2>Update Your Profile</h2>
            {userUpdateResult === "success" && (
              <div className="alert alert-success" role="alert">
                Your profile has been updated!
              </div>
            )}
            {userUpdateResult === "fail" && (
              <div className="alert alert-danger" role="alert">
                There was an error updating your profile.
              </div>
            )}
            <div className="row">
              <div className="col-6">
                <form onSubmit={updateUser} className="mb-2">
                  <div className="form-group mb-2">
                    <label>Email Address</label>
                    <input
                      type="text"
                      className="form-control"
                      name="email"
                      value={userFormData.email}
                      onChange={handleUserInputChange}
                    />  
                  </div>
                  <div className="form-group mb-2">
                    <label>Password</label>
                    <input

                      type="password"
                      className="form-control"
                      name="password"
                      value={userFormData.password}
                      onChange={handleUserInputChange}
                    />
                  </div>
                  <div className="form-group mb-2">
                    <label>Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      value={userFormData.name}
                      onChange={handleUserInputChange}
                    />
                  </div>
                  <div className="form-group mb-2">
                    <label>Location</label>
                    <input
                      type="text"
                      className="form-control"
                      name="location"
                      value={userFormData.location}
                      onChange={handleUserInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <button className="btn btn-primary">Update Profile</button>
                    <button className="btn btn-secondary" onClick={() => setShowUserForm(false)}>Cancel</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="row">
        <div className="col-6">
          <h2>Your Pets</h2>
          {!showPetForm && (
            <button className="btn btn-primary" onClick={() => setShowPetForm(true)}>Add Pet</button>
          )}
          {showPetForm && (
            <div className="row">
              <div className="col-6">

                <form onSubmit={updateUser} className="mb-2">
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
                  <div className="form-group mb-2">
                    <label>Weight</label>
                    <input
                      type="text"
                      className="form-control"
                      name="weight"
                      value={petFormData.weight}
                      onChange={handlePetInputChange}
                    />
                  </div>
                  <button className="btn btn-primary" onClick={() => handleAddPet(petFormData)}>Add Pet</button>
                  <button className="btn btn-primary" onClick={() => setShowPetForm(false)}>Cancel</button>
              </form>
            </div>
          </div>
        )}
        </div>
      </div>
     </>
  )
}

export default ProfilePage