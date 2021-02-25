import { useEffect, useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import Navbar from './Navbar';
import Home from './Home';
import List from './List';
import CompanyDetail from './CompanyDetail';
import CompanyCard from './CompanyCard';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import Profile from './Profile';
import JoblyApi from './api';

const Routes = () => {
  const [ isLoading, setIsLoading ] = useState(true);
  const [ companies, setCompanies ] = useState([]);
  // const [ jobs, setJobs ] = useState([]);

  // get companies when page loads and add to state
  useEffect(() => {
    async function getItems() {
      let companies = await JoblyApi.getCompanies();
      setCompanies(companies);
      setIsLoading(false);
    }
    getItems();
  }, []);

  async function filterCompanies(params) {
    const companies = await JoblyApi.getCompanies(params);
    setCompanies(companies);
  }

  return (
    <div>
      <Navbar />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/companies">
          {isLoading ? <h2>Loading...</h2> : <List items={companies} card={CompanyCard} filter={filterCompanies} />}
        </Route>
        <Route exact path="/companies/:handle">
          <CompanyDetail />
        </Route>
        <Route exact path="/jobs">
          <List />
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
