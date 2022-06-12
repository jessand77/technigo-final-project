import { createSlice } from '@reduxjs/toolkit';

import { BASE_URL } from 'utils/urls';

const initialState = {
	userId: null,
	username: null,
	accessToken: null,
	error: null,
	marathons: [],
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
		setError: (store, action) => {
			store.error = action.payload;
		},
		setMarathons: (store, action) => {
			store.marathons = action.payload;
		}
		// // Osäker på om det här blir rätt?
		// addMarathon: (store, action) => {
		// 	state.marathons.push(action.payload);
		// },
	},
});

// mode is either 'login' or 'register'
export const postUserData = (options, mode) => {
	return (dispatch) => {
		fetch(BASE_URL + mode, options)
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
				if (data.success) {
					dispatch(user.actions.setUserId(data.userId));
					dispatch(user.actions.setUsername(data.username));
					dispatch(user.actions.setAccessToken(data.accessToken));
					dispatch(user.actions.setAccessToken(data.accessToken));
					dispatch(user.actions.setError(null));
				} else {
					dispatch(user.actions.setUserId(null));
					dispatch(user.actions.setUsername(null));
					dispatch(user.actions.setAccessToken(null));
					dispatch(user.actions.setError(data.message));
				}
			});
	};
};



export default user;
