import React from 'react';
import cookie from 'js-cookie';
import { useAppCtx } from '../utils/AppContext';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Geolocation from './Geolocation';

const Header = () => {
  const { user, userlocation, getUser } = useAppCtx();

  const logout = () => {
    cookie.remove('auth-token');
    window.location.href = '/';
  };

  return (
    <header>
      <Navbar bg="dark" expand="md">
        <Navbar.Brand href="/">
          <h2>PawPrints</h2>
        </Navbar.Brand>
        <div className="d-flex flex-grow-1 justify-content-center">
          <Geolocation />
        </div>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link href="/">Home</Nav.Link>
            {!user ? (
              <>
                <Nav.Link href="/signup">Signup</Nav.Link>
                <Nav.Link href="/login">Login</Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link href={`/profile/${user._id}`}>Profile</Nav.Link>
                <Nav.Link href="##" onClick={logout}>
                  Logout
                </Nav.Link>
                {!user.profileImage ? (
                  <Nav.Link href="/profileImage">Add a profile Image!</Nav.Link>
                ) : (
                  <NavDropdown
                    title={
                      <img
                        src={user.profileImage}
                        alt="The users profile pic"
                        style={{ width: '40px', borderRadius: '20px' }}
                      />
                    }
                    id="basic-nav-dropdown"
                  >
                    <NavDropdown.Item href={`/profile/${user._id}`}>
                      Profile
                    </NavDropdown.Item>
                    <NavDropdown.Item href="##" onClick={logout}>
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                )}
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </header>
  );
};

export default Header;
