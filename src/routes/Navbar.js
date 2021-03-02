import { NavLink, Link } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import React, { useContext } from 'react';
import UserContext from '../helpers/UserContext';
import './NavBar.css';

const NavBar = ({ logout }) => {
  const { user } = useContext(UserContext);
  const loggedIn = (
    <Nav className="ml-auto">
      <Nav.Link as={NavLink} eventKey="1" to="/companies">
        Companies
      </Nav.Link>
      <Nav.Link as={NavLink} eventKey="2" to="/jobs">
        Jobs
      </Nav.Link>
      <Nav.Link as={NavLink} eventKey="3" to="/profile">
        {user && user.username}
      </Nav.Link>
      <Nav.Link as={Link} to="/" eventKey="4" onClick={logout}>
        Log out
      </Nav.Link>
    </Nav>
  );

  const loggedOut = (
    <Nav className="ml-auto">
      <Nav.Link as={NavLink} eventKey="5" to="/login">
        Log In
      </Nav.Link>
      <Nav.Link as={NavLink} eventKey="6" to="/signup">
        Sign Up
      </Nav.Link>
    </Nav>
  );

  return (
    <Navbar collapseOnSelect variant="dark" expand="md" className="NavBar">
      <Navbar.Brand as={NavLink} to="/">
        Jobly
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="navbar-collapse" />
      <Navbar.Collapse id="navbar-collapse" className="justify-content-end">
        {user ? loggedIn : loggedOut}
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
