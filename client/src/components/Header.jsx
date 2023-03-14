
import cookie from "js-cookie";
import { useAppCtx } from "../utils/AppContext";
import { useState, useEffect } from "react";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Geolocation from "./Geolocation";


const Header = () => {
  const { user, userlocation, getUser } = useAppCtx();

  const [userProfileImage, setUserProfileImage] = useState(null);

  console.log(userProfileImage);
  // console.log(user._id)
  // console.log(user.profileImage)  


  const logout = () => {
    cookie.remove("auth-token");
    window.location.href = "/";
  };


  return (
    <header className="px-2 pb-0 mb-0 row d-flex justify-context-between">
      {/* style={{ borderBottom: '1px solid #333' }} */}
      <div className="d-flex justify-content-between align-items-center col-auto">
        <div className="h2-title d-flex align-items-center col-auto">
          <a className="nav-link active" aria-current="page" href="/">
            <h2>PawPrints</h2>
          </a>
          <p className="header-p">Find a lost pet near you!</p>
        </div>
      </div>

      <div className="d-flex justify-content-center align-items-center position-relative mx-auto col-auto ">

          <Geolocation />
          {/* Insert the name of the city when the user logs in */}
          {/* <p style={{marginRight: "10rem"}}>Your Location: {useGeoLocation.city}</p> */}

      </div>

      <nav
        className="navbar navbar-dark navbar-expand-md bg-body-secondary col-auto"
        data-bs-theme="dark"
      >
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/">
                  Home
                </a>
              </li>

              {!user ? (
                <>
                  <li className="nav-item">
                    <a className="nav-link" href="/signup">
                      Signup
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="/login">
                      Login
                    </a>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    {/* use a dynamic URL with the user id */}
                    <a className="nav-link" href={`/profile/${user._id}`}>
                      Profile
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="##" onClick={logout}>
                      Logout
                    </a>
                  </li>
                  
                  {!user.profileImage ?( 
                  <li className='nav-item'>
                    <a className="nav-link" href='/profileImage'>Add a profile Image!</a>
                  </li>) : ( <img src={user.profileImage} alt="The users profile pic" style={{width: "47vh", borderRadius: "50px"}} /> ) }
                </>
                
              )}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
