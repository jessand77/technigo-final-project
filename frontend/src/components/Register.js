import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector, batch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import Loader from './Loader';

// Importing the thunk function here
import user, { postUserData } from '../reducers/user';

const Register = () => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const dispatch = useDispatch();
	const navigate = useNavigate();
	const accessToken = useSelector((store) => store.user.accessToken);
	const validationError = useSelector((store) => store.user.error);

	useEffect(() => {
		if (accessToken) {
			navigate('/registered');
		}
	}, [accessToken]);

	const onFormSubmit = (e) => {
		e.preventDefault();

		const options = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},

			body: JSON.stringify({ username, password }),
		};

		dispatch(postUserData(options, 'register'));
	};

	return (
		<>
			<h1>Register</h1>
			<button>
				<Link to="/login">Login</Link>
			</button>
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
			{validationError && <p>{validationError}</p>}
		</>
	);
};

export default Register;