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
				<Oval
					color="var(--orange)"
					secondaryColor="var(--white)"
					height={80}
					width={80}
					ariaLabel="loading-indicator"
				/>
			)}
		</LoaderDiv>
	);
};

export default Loader;
