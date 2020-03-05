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
import InputMask from '~/components/InputMask';

import { CardStyled } from './styles';

export default function DeliverymenDetail({ match }) {
	const { id } = match.params;
	const formRef = useRef(null);

	useEffect(() => {
		async function loadInitialData(id) {
			if (id) {
				const response = await api.get(`/recipients/${id}`);
				formRef.current.setData(response.data);
			}
		}
		loadInitialData(id);
	}, [id]);

	async function handleSubmit(data, { reset }) {
		formRef.current.setErrors({});
		try {
			const schema = Yup.object().shape({
				name: Yup.string().required('O nome é obrigatório'),
				street: Yup.string().required('A rua é obrigatória'),
				number: Yup.string().required('O número é obrigatório'),
				complement: Yup.string().notRequired(),
				city: Yup.string().required('A cidade é obrigatória'),
				state: Yup.string().required('O estado é obrigatório'),
				cep: Yup.string().required('O CEP é obrigatório'),
			});

			await schema.validate(data, {
				abortEarly: false,
			});

			if (id) {
				await api.put(`/recipients/${id}`, {
					name: data.name,
					street: data.street,
					number: data.number,
					complement: data?.complement,
					city: data.city,
					state: data.state,
					cep: data.cep,
				});
				history.push('/recipients');
				toast.success('Destinatário editado com sucesso!');
			} else {
				await api.post('/recipients', {
					name: data.name,
					street: data.street,
					number: data.number,
					complement: data?.complement,
					city: data.city,
					state: data.state,
					cep: data.cep,
				});
				toast.success('Destinatário criado com sucesso!');
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
				<h1>Cadastro de destinatário</h1>
				<nav>
					<Button tone="gray" onClick={() => history.push('/recipients/')}>
						<MdChevronLeft color="#fff" size={20} /> Voltar
					</Button>
					<Button onClick={() => formRef.current.submitForm()}>
						<MdCheck color="#fff" size={20} /> Salvar
					</Button>
				</nav>
			</InternHeader>

			<CardStyled>
				<Form ref={formRef} onSubmit={handleSubmit}>
					<section>
						<div>
							<Input
								label="Nome"
								name="name"
								placeholder="Digite o nome do entregador"
							/>
						</div>
					</section>

					<section>
						<div style={{ flexBasis: '200%' }}>
							<Input
								label="Rua"
								name="street"
								placeholder="Digite a rua do destinatário"
							/>
						</div>
						<div>
							<Input label="Número" name="number" placeholder="1234" />
						</div>
						<div>
							<Input label="Complemento" name="complement" placeholder="Apto" />
						</div>
					</section>
					<section>
						<div>
							<Input label="Cidade" name="city" placeholder="Digite a Cidade" />
						</div>
						<div>
							<InputMask
								label="Estado"
								name="state"
								placeholder="AM"
								mask="aa"
							/>
						</div>
						<div>
							<InputMask
								label="CEP"
								name="cep"
								placeholder="12345-123"
								mask="99999-999"
							/>
						</div>
					</section>
				</Form>
			</CardStyled>
		</>
	);
}
