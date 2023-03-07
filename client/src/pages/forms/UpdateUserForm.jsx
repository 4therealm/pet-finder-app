import React,{useState,useEffect} from "react"
import {useParams} from "react-router-dom"
export default function UpdateUserForm({setShowUserForm,user}) {
  const {id}=useParams()
  const [userFormData,setUserFormData]=useState({email: "",password: "",name: "",phone: ""})
  const [userUpdateResult,setUserUpdateResult]=useState("")

  const handleUserInputChange=(e) => {
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
    if(user) setUserFormData({...userFormData,email: user.email,name: user.name,phone: user.phone})
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
                    <label>phone</label>
                    <input
                      type="text"
                      className="form-control"
                      name="phone"
                      value={userFormData.phone}
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