import { useState, useEffect } from "react";

const SignupPage = () => {
  const defForm = { email: "", password: "", name: "", phone: "" };
  const [formData, setFormData] = useState(defForm);
  const [signupResult, setSignupResult] = useState("");

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
  useEffect(() => {
    if (signupResult === "success") {
      console.log(formData);
    }
  }, [signupResult]);

  return (
    <div style={{ width: "20vw", margin: "0px auto" }}>
      <h1 style={{ textAlign: "center" }}>Signup Page</h1>

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
          <label>Phone</label>
          <input
            type="phone"
            className="form-control"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group mt-2 d-flex justify-content-center">
          <button
            className="btn btn-primary"
            style={{ textAlign: "center" }}
            onClick={handleFormSubmit}
          >
            Sign Me Up!
          </button>
        </div>
      </form>

      {signupResult === "success" && (
        <div
          className="alert alert-success"
          role="alert"
        >
          Signup successful!
        </div>
      )}

      {signupResult === "fail" && (
        <div
          className="alert alert-danger"
          role="alert"
        >
          Signup failed!
        </div>
      )}
    </div>
  );
};

export default SignupPage;
