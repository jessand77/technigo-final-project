import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector, batch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import styled from 'styled-components/macro';

import { API_URL } from 'utils/urls';
import Logo from 'components/Logo';

import user from '../reducers/user';
import ui from '../reducers/ui';

const Login = () => {
	return (
		<>
			<header>
				<Logo />
			</header>
			<main>
				<div>
					<h1>Welcome to Bucket List Marathons!</h1>
					<p>Here you can read about marathons</p>
				</div>
			</main>
		</>
	);
};

export default Login;
