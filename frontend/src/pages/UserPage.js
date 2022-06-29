import React, { useState } from 'react';
import { useDispatch, useSelector, batch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components/macro';
import moment from 'moment';

import { device } from 'utils/breakpoints';
import { API_URL } from 'utils/urls';

import Logo from 'components/Logo';
import MarathonList from 'components/MarathonList';
import Profile from 'components/Profile';
import Button from 'components/Button';

import user from '../reducers/user';
import ui from '../reducers/ui';

const UserPageHeaderContent = styled.div`
	flex-direction: column;
	gap: 1rem;
`;

const Nav = styled.nav`
	display: flex;
	button {
		font-size: 0.8rem;
	}
	@media ${device.tablet} {
		flex-direction: row;
		button {
			font-size: 1rem;
		}
	}

	@media ${device.laptop} {
		flex-direction: row;
		button {
			font-size: 1.3rem;
		}
	}
`;

const AllRaceHeader = styled.h1`
	width: 70%;
	font-size: 1.2rem;
	color: var(--orange);
	text-align: center;

	@media ${device.tablet} {
		font-size: 1.2rem;
	}

	@media ${device.laptop} {
		font-size: 1.6rem;
	}
`;

const UserPage = () => {
	const [display, setDisplay] = useState('races');

	const userId = useSelector((store) => store.user.userId);
	const userSince = useSelector((store) => store.user.userSince);
	const accessToken = useSelector((store) => store.user.accessToken);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleLogout = () => {
		let logout = confirm('Logout?');
		if (logout) {
			dispatch(user.actions.setAccessToken(null));
			navigate('/');
		}
	};

	const confirmDelete = () => {
		swal({
			title: 'Are you sure?',
			text: 'If you press ok your accunt will be deleted',
			icon: 'warning',
			buttons: true,
			dangerMode: true,
		}).then((willDelete) => {
			if (willDelete) {
				swal('Your account was successfully deleted', {
					icon: 'success',
				});
				deleteAccount();
			} else {
				swal('Your account has not been deleted');
			}
		});
	};

	const deleteAccount = () => {
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
				if (data.success) {
					navigate('/');
					batch(() => {
						dispatch(user.actions.setUserId(null));
						dispatch(user.actions.setUsername(null));
						dispatch(user.actions.setAccessToken(null));
						dispatch(user.actions.setMarathons([]));
						dispatch(user.actions.setError(null));
					});
				} else {
					alert(data.response);
				}
			})
			.catch((error) => console.error(error))
			.finally(() => dispatch(ui.actions.setLoading(false)));
	};

	return (
		<>
			<header className="header">
				<UserPageHeaderContent className="header-content">
					<Link to="/">
						<Logo />
					</Link>
					<Nav>
						<Button
							active={display === 'races'}
							text="Race list"
							color="var(--blue)"
							textcolor="var(--white)"
							onClick={() => setDisplay('races')}
						></Button>
						<Button
							active={display === 'profile'}
							text="Profile"
							color="var(--blue)"
							textcolor="var(--white)"
							onClick={() => setDisplay('profile')}
						></Button>
						<Button
							text="Logout"
							padding="1px 3px"
							onClick={handleLogout}
						></Button>
					</Nav>
				</UserPageHeaderContent>
			</header>

			<main className="main">
				<>
					{display === 'races' && (
						<>
							<AllRaceHeader>
								20 European marathons to add to your bucket list
							</AllRaceHeader>

							<MarathonList displayMode="all" />
						</>
					)}
					{display === 'profile' && <Profile />}
				</>
			</main>

			<footer className="footer">
				<p>
					Your account was created on {moment(userSince).format('MMMM Do YYYY')}
					.
					<br />
					Click<button onClick={confirmDelete}>here</button>to delete your
					account.
				</p>
			</footer>
		</>
	);
};

export default UserPage;
