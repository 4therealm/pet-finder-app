import { useState, useEffect } from "react"

const SignupPage = (props) => {
//making a default form object
  const defForm = { email: "", password: "", name: "", location: "" }
  //setting the form data to the default form object
  const [ formData, setFormData ] = useState(defForm)
  //setting the signup result to an empty string
  const [ signupResult, setSignupResult ] = useState("")
//this function is called when the user types in the form
  const handleInputChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value})
  }
//this function is called when the user clicks the submit button
  const handleFormSubmit = async(e) => {
    e.preventDefault()
    const query = await fetch("/api/user", {
      method: "post",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json"
      }
    })
//if the query is not ok, set the signup result to fail
    if( !query.ok ) {
      // console.log("Signup failed!")
      //setSignupResult is a function that sets the signupResult to "fail"
      setSignupResult("fail")
    } else {
      const result = await query.json()
      setSignupResult("success")
    }
  }
  // useEffect(() => {
  //   if( signupResult === "success" ){
  //     console.log(formData)
  //   } 
  // }, [signupResult])



  return (
    <>
      <h1>Signup Page</h1>

      <form className="form mb-3">
        <div className="form-group">
          <label>Email Address</label>
          <input   
            type="text"
            name="email"
            placeholder="john@gmail.com"
            className="form-control"
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input   
            type="password"
            name="password"
            className="form-control"
            value={formData.password}
            onChange={handleInputChange}
          />
        </div>
        
        <div className="form-group mb-2">
            <label>name</label>
            <input 
              type="text" 
              className="form-control" 
              name="name" 
              value={formData.name} 
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group mb-2">
            <label>location</label>
            <input 
              type="text" 
              className="form-control" 
              name="location" 
              value={formData.location} 
              onChange={handleInputChange}
            />
          </div>
        <div className="form-group mt-2">
          <button className="btn btn-primary" onClick={handleFormSubmit}>Sign Me Up!</button>
        </div>
      </form>

      { signupResult === "success" && (
        <div className="alert alert-success" role="alert">
          Signup successful!
        </div>
      )}

      { signupResult === "fail" && (
        <div className="alert alert-danger" role="alert">
          Signup failed!
        </div>
      )}
    </>
  )
}

export default SignupPage