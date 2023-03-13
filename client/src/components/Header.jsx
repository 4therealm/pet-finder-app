import cookie from "js-cookie";
import { useAppCtx } from "../utils/AppContext";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Geolocation from "./Geolocation";
// import Button from "@mui/material/Button";
// import Menu from "@mui/material/Menu";
// import MenuItem from "@mui/material/MenuItem";

const Header = () => {
  const { user, userlocation } = useAppCtx();

  const logout = () => {
    cookie.remove("auth-token");
    window.location.href = "/";
  };

  // const [anchorEl, setAnchorEl] =
  //   (React.useState < null) | (HTMLElement > null);
  // const open = Boolean(anchorEl);
  // const handleClick = (event: React.MouseEvent<HTMLElement>) => {
  //   setAnchorEl(event.currentTarget);
  // };
  // const handleClose = () => {
  //   setAnchorEl(null);
  // };

  return (
    <header className="px-2 pb-0 mb-0 row d-flex justify-context-between">
      {/* style={{ borderBottom: '1px solid #333' }} */}
      <div className="d-flex justify-content-between align-items-center col-auto">
        <div className="h2-title d-flex align-items-center col-auto">
          <h2>PawPrints</h2>
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
