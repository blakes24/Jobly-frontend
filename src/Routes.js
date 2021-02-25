// import { useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import Navbar from './Navbar';
import Home from './Home';
import JobList from './JobList';
import CompanyList from './CompanyList';
import CompanyDetail from './CompanyDetail';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import Profile from './Profile';

const Routes = () => {
  return (
    <div>
      <Navbar />
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
          <LoginForm />
        </Route>
        <Route exact path="/signup">
          <SignupForm />
        </Route>
        <Route exact path="/profile">
          <Profile />
        </Route>
        <Route>
          <p>Page not found.</p>
        </Route>
      </Switch>
    </div>
  );
};

export default Routes;
