import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Start from 'components/Start';
import Register from 'components/Register';
import RegisterSuccess from './RegisterSuccess';
import Login from 'components/Login';
import NotFound from 'components/NotFound';
import UserPage from './UserPage';

const AppContainer = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Start />}></Route>
				<Route path="/register" element={<Register />}></Route>
				<Route path="/registered" element={<RegisterSuccess />}></Route>
				<Route path="/login" element={<Login />}></Route>
				<Route path="/userpage" element={<UserPage />}></Route>
				<Route path="*" element={<NotFound />}></Route>
			</Routes>
		</BrowserRouter>
	);
};

export default AppContainer;
