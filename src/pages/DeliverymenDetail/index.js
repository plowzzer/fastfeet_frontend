import React, { useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

import { MdChevronLeft, MdCheck } from 'react-icons/md';
import { Form } from '@unform/web';

import api from '~/services/api';
import history from '~/services/history';

import InternHeader from '~/components/InternHeader';
import Button from '~/components/Button';
import Input from '~/components/Input';

import { CardStyled } from './styles';

export default function DeliverymenDetail({ match }) {
	const { id } = match.params;
	const formRef = useRef(null);

	async function loadInitialData(id) {
		if (id) {
			console.log(id);
		}
	}

	async function handleSubmit(id) {
		if (id) {
			console.log(id);
		}
	}

	return (
		<>
			<InternHeader>
				<h1>Cadastro de entregadores</h1>
				<nav>
					<Button tone="gray" onClick={() => history.push('/deliverymen/')}>
						<MdChevronLeft color="#fff" size={20} /> Voltar
					</Button>
					<Button onClick={() => formRef.current.submitForm()}>
						<MdCheck color="#fff" size={20} /> Salvar
					</Button>
				</nav>
			</InternHeader>

			<CardStyled>
				<Form ref={formRef} onSubmit={handleSubmit}>
					<div>
						<Input
							label="Nome"
							name="name"
							placeholder="Digite o nome do entregador"
						/>
					</div>

					<div>
						<Input
							label="Email"
							name="email"
							placeholder="Digite o email do entregador"
						/>
					</div>
				</Form>
			</CardStyled>
		</>
	);
}
