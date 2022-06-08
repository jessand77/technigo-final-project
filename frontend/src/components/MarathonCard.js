import React from 'react';
import styled from 'styled-components';

const StyledCard = styled.div`
		border: 1px solid black;
	`;

const MarathonCard = ({ name, city }) => {

    return (
        <>
            <StyledCard>
                <h2>{name}</h2>
                <p>{city}</p>
            </StyledCard>
        </>
    );
};

export default MarathonCard;
