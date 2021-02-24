import { useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import Navbar from './Navbar'
import Home from './Home'
import List from './List'
import CompanyDetail from './CompanyDetail'
import LoginForm from './LoginForm'
import SignupForm from './SignupForm'
import Profile from './Profile'

const Routes = () => {
	return (
		<>
			<Navbar />
			<Switch>
				<Route exact path="/">
					<Home />
				</Route>
				<Route exact path="/companies">
					<List />
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
		</>
	);
};

export default Routes;
