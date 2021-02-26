import { useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import Navbar from './Navbar';
import Home from './Home';
import JobList from './JobList';
import CompanyList from './CompanyList';
import CompanyDetail from './CompanyDetail';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import Profile from './Profile';
import JoblyApi from './api';
import jwt_decode from 'jwt-decode';
import UserContext from './UserContext';

const Routes = () => {
  const [ token, setToken ] = useState(null);
  const [ user, setUser ] = useState(null);

  useEffect(
    () => {
      async function getUser() {
        if (!token) {
          return setUser(null);
        }
        const username = jwt_decode(token).username;
        const user = await JoblyApi.getUser(username);
        setUser(user);
      }
      getUser();
    },
    [ token ]
  );

  async function register(data) {
    const token = await JoblyApi.register(data);
    setToken(token);
  }

  async function login(data) {
    const token = await JoblyApi.login(data);
    setToken(token);
  }

  function logout() {
    JoblyApi.token = null;
    setToken(null);
  }

  return (
    <UserContext.Provider value={user}>
      <Navbar logout={logout} />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/companies">
          <CompanyList />
        </Route>
        <Route exact path="/companies/:handle">
          <CompanyDetail />
        </Route>
        <Route exact path="/jobs">
          <JobList />
        </Route>
        <Route exact path="/login">
          <LoginForm login={login} />
        </Route>
        <Route exact path="/signup">
          <SignupForm register={register} />
        </Route>
        <Route exact path="/profile">
          <Profile />
        </Route>
        <Route>
          <p>Page not found.</p>
        </Route>
      </Switch>
    </UserContext.Provider>
  );
};

export default Routes;
