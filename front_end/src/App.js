import React from 'react';
import './App.css';
import { Switch, Route, Redirect } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import Home from './screens/Home';
import Login from './screens/Login';
import SignUp from './screens/SignUp';
import EditProfile from './screens/EditProfile';
import Navbar from './components/Navbar/Navbar';

function App() {
	return (
		<div className="App">
			<Navbar />
			<Switch>
				<Route exact path="/login">
					<Login />
				</Route>
				<Route exact path="/register">
					<SignUp />
				</Route>
				<PrivateRoute path="/me">
					<EditProfile />
				</PrivateRoute>
				<Route path="/" exact>
					<Home />
				</Route>
				<Route path="/logout" exact>
					<Redirect to="/" />
				</Route>
			</Switch>
		</div>
	);
}

export default App;
