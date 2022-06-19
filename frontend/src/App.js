import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import styled from 'styled-components';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import 'mapbox-gl/dist/mapbox-gl.css';

import env from 'react-dotenv';

import StartPage from './pages/StartPage';
import LoginOrRegister from 'pages/LoginOrRegister';
import UserPage from './pages/UserPage';
import DeleteAccount from 'pages/DeleteAccount';
import EndPage from 'pages/EndPage';
import NotFound from './pages/NotFound';
import Map from './components/Map';

import user from 'reducers/user';
import ui from 'reducers/ui';

const reducer = combineReducers({
	user: user.reducer,
	ui: ui.reducer,
});

const store = configureStore({ reducer });

const OuterWrapper = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
`;

const InnerWrapper = styled.div`
	width: 70%;
	margin: 0 auto;
`;

export const App = () => {
	return (
		<OuterWrapper>
			<InnerWrapper>
				<Provider store={store}>
					<BrowserRouter>
						<Routes>
							<Route path="/" element={<StartPage />}></Route>
							<Route path="/login" element={<LoginOrRegister />}></Route>
							<Route path="/userpage" element={<UserPage />}></Route>
							<Route path="/delete-account" element={<DeleteAccount />}></Route>
							<Route path="/loggedout" element={<EndPage />}></Route>
							<Route path="/map" element={<Map />}></Route>
							<Route path="*" element={<NotFound />}></Route>
						</Routes>
					</BrowserRouter>
				</Provider>
			</InnerWrapper>
		</OuterWrapper>
	);
};
