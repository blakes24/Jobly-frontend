import { NavLink } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';

const NavBar = () => (
  <Navbar bg="dark" variant="dark">
    <Navbar.Brand as={NavLink} to="/">
      Jobly
    </Navbar.Brand>
    <Nav className="ml-auto">
      <Nav.Link as={NavLink} to="/">
        Home
      </Nav.Link>
      <Nav.Link as={NavLink} to="/companies">
        Companies
      </Nav.Link>
      <Nav.Link as={NavLink} to="/jobs">
        Jobs
      </Nav.Link>
      <Nav.Link as={NavLink} to="/profile">
        Profile
      </Nav.Link>
      <Nav.Link as={NavLink} to="/login">
        Log In
      </Nav.Link>
      <Nav.Link as={NavLink} to="/signup">
        Sign Up
      </Nav.Link>
    </Nav>
  </Navbar>
);

export default NavBar;
