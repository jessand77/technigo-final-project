import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import StartPage from './pages/StartPage';
import LoginOrRegister from 'pages/LoginOrRegister';
import UserPage from './pages/UserPage';
import EndPage from 'pages/EndPage';
import NotFound from './pages/NotFound';

const AppContainer = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<StartPage />}></Route>
				<Route path="/login" element={<LoginOrRegister />}></Route>
				<Route path="/userpage" element={<UserPage />}></Route>
				<Route path="/loggedout" element={<EndPage />}></Route>
				<Route path="*" element={<NotFound />}></Route>
			</Routes>
		</BrowserRouter>
	);
};

export default AppContainer;
