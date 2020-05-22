import React from 'react';
import * as Yup from 'yup';

import { Form } from '@unform/web';
import { useDispatch, useSelector } from 'react-redux';

import { signInRequest } from '~/store/modules/auth/actions';

import logo from '~/assets/logo.png';

import Button from '~/components/Button';
import Input from '~/components/Input';

const schema = Yup.object().shape({
	email: Yup.string()
		.email('Insira um e-mail válido')
		.required('O e-mail é obrigatório'),
	password: Yup.string()
		.min(4)
		.required('Você precisa digitar a sua senha'),
});

export default function Dashboard() {
	const dispatch = useDispatch();
	const loading = useSelector(state => state.auth.loading);

	function handleSubmit({ email, password }) {
		dispatch(signInRequest(email, password));
	}

	return (
		<>
			<img src={logo} alt="FastFeet" />
			<Form schema={schema} onSubmit={handleSubmit}>
				<Input
					name="email"
					label="Email"
					type="email"
					placeholder="Seu e-mail"
				/>
				<Input
					name="password"
					label="Senha"
					type="password"
					placeholder="Sua senha"
				/>

				<Button block>{loading ? 'Carregando...' : 'Entrar no sistema'}</Button>
			</Form>
		</>
	);
}
