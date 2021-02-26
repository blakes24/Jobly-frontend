import { useContext } from 'react';
import UserContext from './UserContext';

const Home = () => {
  const user = useContext(UserContext);
  return (
    <div>
      <h1>Jobly</h1>
      <p>Find your next job.</p>
      {user && <p>Welcome back {user.username}!</p>}
    </div>
  );
};

export default Home;
