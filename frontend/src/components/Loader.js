import React from 'react';
import { useSelector } from 'react-redux';

const Loader = () => {
	const isLoading = useSelector((store) => store.ui.isLoading);
	return isLoading && <p>Loading...</p>;
};

export default Loader;
