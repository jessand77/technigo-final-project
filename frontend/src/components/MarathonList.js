import React, { useState } from 'react';

const MarathonList = ({ displayMode }) => {
	const [list, setList] = useState([]);

	return (
		<>
			<h1>Race list</h1>
			<h2>Displaying all or bucket</h2>
			<h3>{displayMode}</h3>
		</>
	);
};

export default MarathonList;
