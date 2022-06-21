import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import 'mapbox-gl/dist/mapbox-gl.css';

import StartPage from './pages/StartPage';
import Login from './pages/Login';
import UserPage from './pages/UserPage';
import MarathonPage from './pages/MarathonPage';
import NotFound from './pages/NotFound';

import user from 'reducers/user';
import ui from 'reducers/ui';

const reducer = combineReducers({
	user: user.reducer,
	ui: ui.reducer,
});

const persistedStateJSON = localStorage.getItem('state');
let persistedState = {};

if (persistedStateJSON) {
	persistedState = JSON.parse(persistedStateJSON);
}

const store = configureStore({ reducer, preloadedState: persistedState });

store.subscribe(() => {
	localStorage.setItem('state', JSON.stringify(store.getState()));
});

export const App = () => {
	return (
		<Provider store={store}>
			<BrowserRouter>
				<Routes>
					<Route path="/" exact element={<StartPage />}></Route>
					<Route path="/login" element={<Login />}></Route>
					<Route path="/userpage" element={<UserPage />}></Route>
					<Route path="/marathon/:id" element={<MarathonPage />}></Route>
					<Route path="*" element={<NotFound />}></Route>
				</Routes>
			</BrowserRouter>
		</Provider>
	);
};
