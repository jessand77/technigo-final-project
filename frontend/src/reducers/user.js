import { createSlice } from '@reduxjs/toolkit';

import { API_URL } from 'utils/urls';

const initialState = {
	userId: null,
	username: null,
	accessToken: null,
	marathons: [],
	error: null,
};

const user = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUserId: (store, action) => {
			store.userId = action.payload;
		},
		setUsername: (store, action) => {
			store.username = action.payload;
		},
		setAccessToken: (store, action) => {
			store.accessToken = action.payload;
		},
		setMarathons: (store, action) => {
			store.marathons = action.payload;
		},
		setError: (store, action) => {
			store.error = action.payload;
		},
		
		// addMarathon: (store, action) => {
		// 	store.marathons.push(action.payload);
		// },
		// deleteMarathon: (store, action) => {
		// 	store.marathons.splice(action.payload, 1);
		// },
		// removeAllMarathons: (store, action) => {
		// 	store.marathons = [];
		// },
	},
});


export default user;
