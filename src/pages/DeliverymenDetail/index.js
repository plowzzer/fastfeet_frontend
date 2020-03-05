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
import FileInput from '~/components/FileInput';

import { CardStyled } from './styles';

export default function DeliverymenDetail({ match }) {
	const { id } = match.params;
	const formRef = useRef(null);

	useEffect(() => {
		async function loadInitialData(id) {
			if (id) {
				const response = await api.get(`/deliverymen/${id}`);

				formRef.current.setData(response.data);
				formRef.current.setFieldValue('avatar', response?.data?.avatar?.url);
			}
		}
		loadInitialData(id);
	}, [id]);

	async function handleSubmit(data, { reset }) {
		formRef.current.setErrors({});
		try {
			const schema = Yup.object().shape({
				name: Yup.string().required('O nome é obrigatório'),
				email: Yup.string().required('O email é obrigatório'),
			});

			await schema.validate(data, {
				abortEarly: false,
			});

			const dataFile = new FormData();

			dataFile.append('file', data.avatar);

			const responseFile = data.avatar
				? await api.post('files', dataFile)
				: null;

			if (id) {
				await api.put(`/deliverymen/${id}`, {
					name: data.name,
					email: data.email,
					avatar_id: responseFile?.data?.id,
				});
				toast.success('Entregador editado com sucesso!');
			} else {
				await api.post('/deliverymen', {
					name: data.name,
					email: data.email,
					avatar_id: responseFile?.data?.id,
				});
				toast.success('Entregador criado com sucesso!');
			}

			reset();
		} catch (error) {
			if (error instanceof Yup.ValidationError) {
				const errorMessages = {};

				error.inner.forEach(err => {
					errorMessages[err.path] = err.message;
				});

				formRef.current.setErrors(errorMessages);
			}
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
						<FileInput name="avatar" />
					</div>
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
							type="email"
							placeholder="Digite o email do entregador"
						/>
					</div>
				</Form>
			</CardStyled>
		</>
	);
}
