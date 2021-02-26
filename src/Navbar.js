import { NavLink, Link } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import React, { useContext } from 'react';
import UserContext from './UserContext';

const NavBar = ({ logout }) => {
  const { user } = useContext(UserContext);
  const loggedIn = (
    <Nav className="ml-auto">
      <Nav.Link as={NavLink} to="/companies">
        Companies
      </Nav.Link>
      <Nav.Link as={NavLink} to="/jobs">
        Jobs
      </Nav.Link>
      <Nav.Link as={NavLink} to="/profile">
        Profile
      </Nav.Link>
      <Nav.Link as={Link} to="/" onClick={logout}>
        Log out {user && user.username}
      </Nav.Link>
    </Nav>
  );

  const loggedOut = (
    <Nav className="ml-auto">
      <Nav.Link as={NavLink} to="/login">
        Log In
      </Nav.Link>
      <Nav.Link as={NavLink} to="/signup">
        Sign Up
      </Nav.Link>
    </Nav>
  );

  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand as={NavLink} to="/">
        Jobly
      </Navbar.Brand>
      {user ? loggedIn : loggedOut}
    </Navbar>
  );
};

export default NavBar;
