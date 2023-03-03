export default function UpdateUserForm({ userFormData, handleUserInputChange, updateUser, userUpdateResult}) {
return (
<>
<div style={{ width: "50%"}}>
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

{ userUpdateResult === "success" && (
  <div className="alert alert-success" role="alert">
    Update successful!
  </div>
)}

{ userUpdateResult === "fail" && (
  <div className="alert alert-danger" role="alert">
    Update failed!
  </div>
)}
</div>
</>
)
}