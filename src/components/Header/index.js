import React from 'react';
// import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import logo from '~/assets/logo.svg';

import { Container, Content, Profile } from './styles';

export default function Header() {
	// const profile = useSelector(state => state.user.profile);

	return (
		<Container>
			<Content>
				<nav>
					<img src={logo} alt="GoBarber" />
					<Link to="/dasboard">Dashboard</Link>
				</nav>
				<aside>
					<Profile>
						<div>
							<strong>Profile name</strong>
							<Link to="/profile">Meu Perfil</Link>
						</div>
						<img
							src="https://api.adorable.io/avatars/50/abott@adorable.png"
							alt=""
						/>
					</Profile>
				</aside>
			</Content>
		</Container>
	);
}
