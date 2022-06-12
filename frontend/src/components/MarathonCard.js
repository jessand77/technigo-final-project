import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';

import user from 'reducers/user';

const StyledCard = styled.div`
	border: 1px solid black;
	padding: 10px;
	background-color: whitesmoke;
	h2 {
		font-size: smaller;
	}
	img {
		height: 50px;
		display: block;
	}
	p {
		font-size: xx-small;
	}
	label {
		font-size: xx-small;
		font-style: italic;
		position: relative;
		bottom: 2px;
	}
`;

const MarathonCard = (props) => {
	const { id, name, city, country, url, image } = props;

	const dispatch = useDispatch();

	const addMarathon = () => {
		console.log(id);
		dispatch(user.actions.addMarathon(id));
	};

	

	return (
		<>
			<StyledCard>
				<h2>{name}</h2>
				<label htmlFor="run">Add to my list</label>
				<input type="checkbox" id="run" />
				<button onClick={addMarathon}>Add to my list</button>
				<p>
					{city}, {country}
				</p>
				<a href={url} target="_blank">
					<img src={image} />
				</a>
			</StyledCard>
		</>
	);
};

export default MarathonCard;
