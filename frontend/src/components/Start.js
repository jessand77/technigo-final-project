import React from 'react';
import { Link } from 'react-router-dom';
import MarathonList from './MarathonList';

const Start = () => {
    return (
        <div>
            <button><Link to="/login">Login</Link></button>
            <button><Link to="/register">Register</Link></button>
            <MarathonList />
        </div>
    );
};

export default Start;
