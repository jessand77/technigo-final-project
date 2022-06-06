import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Start from 'components/Start';
import Register from 'components/Register';
import Login from 'components/Login';
import NotFound from 'components/NotFound';

const AppContainer = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Start />}></Route>
                <Route path="/register" element={<Register />}></Route>
                <Route path="/login" element={<Login />}></Route>
                <Route path="*" element={<NotFound />}></Route>
            </Routes>
        </BrowserRouter>
    )
};

export default AppContainer;
