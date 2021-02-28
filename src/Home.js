import { useContext } from 'react';
import UserContext from './helpers/UserContext';
import './Home.css';

const Home = () => {
  const { user } = useContext(UserContext);
  return (
    <div className="Home">
      <h1>Jobly</h1>
      <p>The best place to find your next job.</p>
      {user && <h2 className="Home-welcome">Welcome back {user.username}!</h2>}
    </div>
  );
};

export default Home;
