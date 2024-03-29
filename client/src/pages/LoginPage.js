import { useState } from "react"
//importing the cookie library
import cookie from "js-cookie"

const LoginPage = (props) => {
  // console.log(props)

  const defForm = { email: "", password: "" }
  const [ formData, setFormData ] = useState(defForm)
  const [ loginResult, setLoginResult ] = useState("")

  const handleInputChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value})
  }

  const handleFormSubmit = async (e) => {
    // console.log(formData)
    e.preventDefault()
    const query = await fetch("/api/user/auth", {
      method: "post",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json"
      }
    })
    const result = await query.json()
    // console.log(result)
//if the query is not ok, set the signup result to fail
    if( result && !result.err && result.data && result.data.token ){
      setLoginResult("success")
      window.location.href = '/';
      // set the cookie if the login is successful
      // the cookie will expire in 3 days
      cookie.set("auth-token", result.data.token, { expires: 3 })
    } else {
      setLoginResult("fail")
    }
  }

  return (
    <div style={{ width: "20vw", margin: "0px auto"}}>
      <h1 style={{textAlign: "center"}}>Login Page</h1>

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

        <div className="form-group mt-2 d-flex justify-content-center">
          <button className="btn btn-rounded btn-dark" style={{ textAlign: "center" }} onClick={handleFormSubmit}>Log Me In!</button>
        </div>
      </form>

      { loginResult === "success" && (
        <div className="alert alert-success" role="alert">
          Login successful!
        </div>
      )}

      { loginResult === "fail" && (
        <div className="alert alert-danger" role="alert">
          Login failed!
        </div>
      )}
    </div>
  )

}

export default LoginPage