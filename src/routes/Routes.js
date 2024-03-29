import { useState, useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Navbar from "./Navbar";
import Home from "../Home";
import JobList from "../jobs/JobList";
import CompanyList from "../companies/CompanyList";
import CompanyDetail from "../companies/CompanyDetail";
import LoginForm from "../forms/LoginForm";
import SignupForm from "../forms/SignupForm";
import Profile from "../forms/Profile";
import JoblyApi from "../helpers/api";
import jwt_decode from "jwt-decode";
import UserContext from "../helpers/UserContext";
import useLocalStorage from "../helpers/useLocalStorage";

const Routes = () => {
  const [token, setToken] = useLocalStorage("token", "");
  const [user, setUser] = useState(null);

  // if token is present get user details, if not remove user from state
  useEffect(() => {
    async function getUser() {
      if (!token) {
        setUser(null);
      } else {
        try {
          JoblyApi.token = token;
          const username = jwt_decode(token).username;
          const user = await JoblyApi.getUser(username);
          setUser(user);
        } catch (err) {
          console.error(err);
        }
      }
    }
    getUser();
  }, [token]);

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

  async function update(data) {
    const token = await JoblyApi.login({
      username: data.username,
      password: data.password,
    });
    await JoblyApi.updateUser(data);
    setToken(token);
  }

  async function apply(id) {
    const job = await JoblyApi.applyToJob(user.username, id);
    user.applications.push(job);
    setUser({ ...user });
  }

  return (
    <UserContext.Provider value={{ user, apply }}>
      <Navbar logout={logout} />

      <Switch>
        <Route exact path="/">
          <Home />
        </Route>

        <Route exact path="/companies">
          {user ? <CompanyList /> : <Redirect to="/" />}
        </Route>
        <Route exact path="/companies/:handle">
          {user ? <CompanyDetail /> : <Redirect to="/" />}
        </Route>
        <Route exact path="/jobs">
          {user ? <JobList /> : <Redirect to="/" />}
        </Route>
        <Route exact path="/login">
          <LoginForm login={login} />
        </Route>
        <Route exact path="/signup">
          <SignupForm register={register} />
        </Route>
        <Route exact path="/profile">
          {user ? <Profile update={update} /> : <Redirect to="/" />}
        </Route>
        <Route>
          <p>Page not found.</p>
        </Route>
      </Switch>
    </UserContext.Provider>
  );
};

export default Routes;
