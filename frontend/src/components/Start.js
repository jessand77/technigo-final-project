import React from 'react';
import { Link } from 'react-router-dom';
import MarathonList from './MarathonList';

const Start = () => {
	return (
		<div>
			<h1>Start</h1>
			<h2>En till rad</h2>
			<button>
				<Link to="/login">Login</Link>
			</button>
			<button>
				<Link to="/register">Register</Link>
			</button>
			<MarathonList />
		</div>
	);
};

export default Start;
