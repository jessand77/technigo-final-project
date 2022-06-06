import React from 'react';
import { useSelector } from 'react-redux';


const UserPage = () => {

    const hasAccessToken = useSelector((store) => store.user.accessToken);
    const username = useSelector((store) => store.user.username);
    if (hasAccessToken) {
        return <h1>Du är inloggad, {username}</h1>
    }

    return (
        <h2>Sorry you have no access</h2>
    )
};

export default UserPage;
