import React from 'react';
import { useSelector } from 'react-redux';
import { Oval } from 'react-loader-spinner';

const Loader = () => {
	const isLoading = useSelector((store) => store.ui.isLoading);

	return <>{isLoading && <Oval color="#00BFFF" height={80} width={80} />}</>;
};

export default Loader;
