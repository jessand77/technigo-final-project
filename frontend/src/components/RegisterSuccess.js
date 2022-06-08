import React from 'react';
import { useSelector } from 'react-redux';

const RegisterSuccess = () => {
	const hasAccessToken = useSelector((store) => store.user.accessToken);
	const username = useSelector((store) => store.user.username);

	if (!hasAccessToken) {
		return <h2>Please try something else</h2>;
	}

	return <h1>Successful registration, {username}</h1>;
};

export default RegisterSuccess;
