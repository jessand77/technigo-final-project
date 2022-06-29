import React from 'react';
import { useSelector } from 'react-redux';
import { Oval } from 'react-loader-spinner';
import styled from 'styled-components';

const LoaderDiv = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	margin: 2rem;
`;

const Loader = () => {
	const isLoading = useSelector((store) => store.ui.isLoading);

	return (
		<LoaderDiv>
			{isLoading && (
				<Oval color="#00BFFF" height={80} width={80} ariaLabel="loading" />
			)}
		</LoaderDiv>
	);
};

export default Loader;
