import React, { useState } from 'react';
import { useSelector, useDispatch, batch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';

import Button from 'components/Button';
import { API_URL } from 'utils/urls';

import user from '../reducers/user';
import ui from '../reducers/ui';

const DeleteAccount = () => {
	const [deleteSuccess, setDeleteSuccess] = useState(true);
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const userId = useSelector((store) => store.user.userId);
	const accessToken = useSelector((store) => store.user.accessToken);

	// console.log(userId);
	// console.log(accessToken);

	const handleYes = () => {
		// console.log(API_URL(`users/${userId}`));
		const options = {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				Authorization: accessToken,
			},
		};
		dispatch(ui.actions.setLoading(true));

		fetch(API_URL(`users/${userId}`), options)
			.then((res) => res.json())
			.then((data) => {
				console.log(data);

				if (data.success) {
					swal({
						title: 'Account deleted!',
						text: 'Taking you back to start page',
						icon: 'success',
						button: 'Ok',
					});
					navigate('/');
					batch(() => {
						dispatch(user.actions.setUserId(null));
						dispatch(user.actions.setUsername(null));
						dispatch(user.actions.setAccessToken(null));
						dispatch(user.actions.setMarathons([]));
						dispatch(user.actions.setError(null));
					});
				} else {
					console.log(data.response);
					setDeleteSuccess(false);
				}
			})
			.catch((error) => console.error(error))
			.finally(() => dispatch(ui.actions.setLoading(false)));
	};

	const handleNo = () => {
		navigate('/userpage');
	};

	return (
		<>
			<h1>Do you want to delete your account?</h1>
			<Button text="Yes" handleClick={handleYes}></Button>
			<Button text="No" handleClick={handleNo}></Button>
			{!deleteSuccess && <h2>No</h2>}
		</>
	);
};

export default DeleteAccount;
