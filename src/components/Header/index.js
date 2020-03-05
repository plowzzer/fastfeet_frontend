import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { signOut } from '~/store/modules/auth/actions';

import logo from '~/assets/logo.png';
import { Container, Content, Profile } from './styles';

export default function Header() {
	const profile = useSelector(state => state.user.profile);
	const dispatch = useDispatch();

	function hanndleSignOut() {
		dispatch(signOut());
	}

	return (
		<Container>
			<Content>
				<nav>
					<img src={logo} alt="Fastfeet" />
					<NavLink to="/packages" activeClassName="active">
						Encomendas
					</NavLink>
					<NavLink to="/deliverymen" activeClassName="active">
						Entregadores
					</NavLink>
					<NavLink to="/recipients" activeClassName="active">
						Destinatários
					</NavLink>
					<NavLink to="/problems" activeClassName="active">
						Problemas
					</NavLink>
				</nav>
				<aside>
					<Profile>
						<strong>{profile.name}</strong>
						<a href="/#" onClick={hanndleSignOut}>
							sair do sistema
						</a>
					</Profile>
				</aside>
			</Content>
		</Container>
	);
}
