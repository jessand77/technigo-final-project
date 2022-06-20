import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	userId: null,
	username: null,
	accessToken: null,
	userSince: null,
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
		setUserSince: (store, action) => {
			store.userSince = action.payload;
		},
		setMarathons: (store, action) => {
			store.marathons = action.payload;
		},
		setError: (store, action) => {
			store.error = action.payload;
		},
	},
});

export default user;
