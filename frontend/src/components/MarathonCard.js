import React from 'react';
import styled from 'styled-components';

const StyledCard = styled.div`
	border: 1px solid black;
	padding: 10px;
	img {
		height: 50px;
		display: block;
	}
`;

const MarathonCard = (props) => {
	const { name, city, country, url, image } = props;
	return (
		<>
			<StyledCard>
				<h2>{name}</h2>
				<p>{city}</p>
				<p>{country}</p>
				<a href={url}>Läs mer</a>
				<img src={image} />
			</StyledCard>
		</>
	);
};

export default MarathonCard;
