import React from 'react';
import styled from 'styled-components';

const StyledCard = styled.div`
		border: 1px solid black;
	`;

const MarathonCard = ({ name }) => {

    return (
        <>
            <StyledCard>{name}</StyledCard>
        </>
    );
};

export default MarathonCard;
