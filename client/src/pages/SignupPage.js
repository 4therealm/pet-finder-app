
import { useState, useEffect } from "react";

const SignupPage = () => {
  const defForm = { email: "", password: "", name: "", phone: "" };
  const [formData, setFormData] = useState(defForm);
  const [signupResult, setSignupResult] = useState("");
  const [emailIsValid, setEmailIsValid] = useState(true);
  const [passwordIsValid, setPasswordIsValid] = useState(true);
  const [nameIsValid, setNameIsValid] = useState(true);
  const [phoneIsValid, setPhoneIsValid] = useState(true);
  const [formIsValid, setFormIsValid] = useState(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/i;
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
  const nameRegex = /^[a-zA-Z\s]*$/;
  const phoneRegex = /^\d{10}$/;

  useEffect(() => {
    setFormIsValid(
      emailIsValid && passwordIsValid && nameIsValid && phoneIsValid
    );
  }, [emailIsValid, passwordIsValid, nameIsValid, phoneIsValid]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const query = await fetch("/api/user", {
      method: "post",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!query.ok) {
      console.log("Signup failed!");
      setSignupResult("fail");
    } else {
      const result = await query.json();
      setSignupResult("success");
      console.log("Signup successful!", result);
    }
  };

  const validateEmail = () => {
    setEmailIsValid(emailRegex.test(formData.email));
  };

  const validatePassword = () => {
    setPasswordIsValid(passwordRegex.test(formData.password));
  };

  const validateName = () => {
    setNameIsValid(nameRegex.test(formData.name));
  };

  const validatePhone = () => {
    setPhoneIsValid(phoneRegex.test(formData.phone));
  };

  return (
    <div style={{ width: "20vw", margin: "0px auto" }}>
      <h1 style={{ textAlign: "center" }}>Signup Page</h1>
  
      <form className="form mb-3" onSubmit={handleFormSubmit}>
        <div className="form-group">
          <label>Email Address</label>
          <input
            type="text"
            name="email"
            placeholder="john@gmail.com"
            className={`form-control ${!emailIsValid ? "is-invalid" : ""}`}
            value={formData.email}
            onChange={handleInputChange}
            onBlur={validateEmail}
          />
          {!emailIsValid && (
            <div className="invalid-feedback">Please enter a valid email address</div>
          )}
        </div>
  
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            className={`form-control ${!passwordIsValid ? "is-invalid" : ""}`}
            value={formData.password}
            onChange={handleInputChange}
            onBlur={validatePassword}
          />
          {!passwordIsValid && (
            <div className="invalid-feedback">
              Please enter a password with at least 6 characters, including at least one uppercase letter, one lowercase letter, and one number
            </div>
          )}
        </div>
  
        <div className="form-group mb-2">
          <label>Name</label>
          <input
            type="text"
            className={`form-control ${!nameIsValid ? "is-invalid" : ""}`}
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            onBlur={validateName}
          />
          {!nameIsValid && (
            <div className="invalid-feedback">Please enter a valid name</div>
          )}
        </div>
  
        <div className="form-group mb-2">
          <label>Phone</label>
          <input
            type="tel"
            className={`form-control ${!phoneIsValid ? "is-invalid" : ""}`}
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            onBlur={validatePhone}
          />
          {!phoneIsValid && (
            <div className="invalid-feedback">Please enter a valid phone number</div>
          )}
        </div>
        <div className="form-group mt-2 d-flex justify-content-center">
          <button
            className="btn btn-rounded btn-dark"
            style={{ textAlign: "center" }}
            type="submit"
            disabled={!formIsValid}
          >
            Sign Me Up!
          </button>
        </div>
      </form>
  
      {signupResult === "success" && (
        <div className="alert alert-success" role="alert">
          Signup successful!
        </div>
      )}
  
      {signupResult === "fail" && (
        <div className="alert alert-danger" role="alert">
          Signup failed!
        </div>
      )}
    </div>
  );
      };  
      export default SignupPage;