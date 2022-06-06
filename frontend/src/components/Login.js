import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector, batch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import Loader from './Loader';

// Importing the thunk function here
import user, { postUserData } from '../reducers/user';
import UserPage from './UserPage';

const Login = () => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const dispatch = useDispatch();
	const navigate = useNavigate();
	const accessToken = useSelector((store) => store.user.accessToken);

	const onFormSubmit = (e) => {
		e.preventDefault();

		const options = {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},

			body: JSON.stringify({ username, password }),
		};

		dispatch(postUserData(options, 'login'));
	};

	return (
		<>
			<h1>Login</h1>
			<button><Link to="/register">Register</Link></button>
			<form onSubmit={onFormSubmit}>
				<label htmlFor="username">Username</label>
				<input
					type="text"
					id="username"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
				/>
				<label htmlFor="password">Password</label>
				<input
					type="password"
					id="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
				<button type="submit">Submit</button>
			</form>
			<Loader />
			<UserPage />
		</>
	);
};

export default Login;
