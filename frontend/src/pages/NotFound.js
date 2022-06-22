import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'components/Button';

const NotFound = () => {
	const navigate = useNavigate();

	return (
		<>
			<main>
				<h2>Page not found</h2>
				<Button text="Start page" onClick={() => navigate('/')}></Button>
			</main>
		</>
	);
};

export default NotFound;
