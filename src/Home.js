import { useContext } from 'react';
import UserContext from './helpers/UserContext';
import { Container } from 'react-bootstrap';
import './Home.css';

const Home = () => {
  const { user } = useContext(UserContext);
  return (
    <Container fluid className="Home">
      <h1>Jobly</h1>
      <p>The best place to find your next job.</p>
      {user && <h2 className="Home-welcome">Welcome back {user.username}!</h2>}
    </Container>
  );
};

export default Home;
