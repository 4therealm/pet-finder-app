import React,{useState,useEffect} from "react"
import { useParams } from "react-router-dom";
export default function UpdateUserForm({setShowUserForm,user}) {
  const {id} = useParams()
  const [userFormData,setUserFormData]=useState({email: "",password: "",name: "",location: ""}) //this is the state that will be updated when the user changes the input fields
  const [userUpdateResult,setUserUpdateResult]=useState("") //this is the state that will be updated when the user updates their profile information and will be used to trigger the useEffect hook


  //the handleUserInputChange function is used to update the userFormData state
  const handleUserInputChange=(e) => {
    // console.log(e.target.name, e.target.value)
    setUserFormData({...userFormData,[e.target.name]: e.target.value})
  }

  const updateUser=async (e) => {
    e?.preventDefault()
    const resp=await fetch(`/api/user/${id}`,{
      method: "PUT",
      body: JSON.stringify(userFormData),
      headers: {
        "Content-Type": "application/json"
      }
    })
    if(!resp.ok) {
      return setUserUpdateResult("fail")
    }
    console.log(resp)
    setUserUpdateResult("success")
    setShowUserForm(false)
  }

  useEffect(() => {
    if(user) setUserFormData({...userFormData,email: user.email,name: user.name,location: user.location})
  },[user])
  return (
    <>
      <div style={{width: "50%"}}>
        <div className="row">
          <div className="col-6">
            <h2>Update Your Profile</h2>
            {userUpdateResult==="success"&&(
              <div className="alert alert-success" role="alert">
                Your profile has been updated!
              </div>
            )}
            {userUpdateResult==="fail"&&(
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
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}