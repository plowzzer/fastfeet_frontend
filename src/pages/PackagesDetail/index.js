import React, { useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

import { MdChevronLeft, MdCheck } from 'react-icons/md';
import { Form } from '@unform/web';

import api from '~/services/api';
import history from '~/services/history';

import Button from '~/components/Button';
import Input from '~/components/Input';
import AsyncSelectInput from '~/components/AsyncSelectInput';

import { HeaderStyled, CardStyled } from './styles';

export default function PackagesDetail({ match }) {
	const { id } = match.params;
	const formRef = useRef(null);

	useEffect(() => {
		async function loadInitialData(id) {
			if (id) {
				const response = await api.get(`/packages/${id}`);

				formRef.current.setData(response.data);
				formRef.current.setFieldValue('recipient_id', {
					value: response.data.recipient.id,
					label: response.data.recipient.name,
				});
				formRef.current.setFieldValue('deliveryman_id', {
					value: response.data.deliveryman.id,
					label: response.data.deliveryman.name,
				});
			}
		}
		loadInitialData(id);
	}, [id]);

	const customStylesSelectInput = {
		control: provided => ({
			...provided,
			height: 45,
		}),
	};

	async function loadRecipientOptions(inputValue, callback) {
		const response = await api.get('/recipients', {
			params: {
				q: inputValue,
			},
		});

		const data = response.data.map(recipient => ({
			value: recipient.id,
			label: recipient.name,
		}));

		callback(data);
	}

	async function loadDeliverymenOptrios(inputValue, callback) {
		const response = await api.get('/deliverymen', {
			params: {
				q: inputValue,
			},
		});

		const data = response.data.map(deliveryman => ({
			value: deliveryman.id,
			label: deliveryman.name,
		}));

		callback(data);
	}

	async function handleSubmit(data, { reset }) {
		formRef.current.setErrors({});
		try {
			const schema = Yup.object().shape({
				product: Yup.string().required('O nome do produto é obrigatório'),
				recipient_id: Yup.string().required('O destinatário é obrigatório'),
				deliveryman_id: Yup.string().required('O entregador é obrigatório'),
			});

			await schema.validate(data, {
				abortEarly: false,
			});

			if (id) {
				await api.put(`/packages/${id}`, {
					product: data.product,
					recipient_id: data.recipient_id,
					deliveryman_id: data.deliveryman_id,
				});
				history.push('/packages');
				toast.success('Encomenda editada com sucesso!');
			} else {
				await api.post('/packages', {
					product: data.product,
					recipient_id: data.recipient_id,
					deliveryman_id: data.deliveryman_id,
				});
				toast.success('Encomenda criada com sucesso!');
			}

			reset();
		} catch (err) {
			if (err instanceof Yup.ValidationError) {
				const errorMessages = {};

				err.inner.forEach(error => {
					errorMessages[error.path] = error.message;
				});

				formRef.current.setErrors(errorMessages);
			}
		}
	}

	return (
		<>
			<HeaderStyled>
				<h1>Cadastro de encomendas</h1>
				<div>
					<Button tone="gray" onClick={() => history.push('/packages/')}>
						<MdChevronLeft color="#fff" size={20} /> Voltar
					</Button>
					<Button onClick={() => formRef.current.submitForm()}>
						<MdCheck color="#fff" size={20} /> Salvar
					</Button>
				</div>
			</HeaderStyled>

			<CardStyled>
				<Form ref={formRef} onSubmit={handleSubmit}>
					<section>
						<AsyncSelectInput
							type="text"
							label="Destinatário"
							name="recipient_id"
							placeholder="Destinatários"
							noOptionsMessage={() => 'Nenhum destinatário encontrado'}
							defaultOptions={loadRecipientOptions}
							loadOptions={loadRecipientOptions}
							styles={customStylesSelectInput}
						/>
						<AsyncSelectInput
							type="text"
							label="Entregador"
							name="deliveryman_id"
							placeholder="Entregadores"
							noOptionsMessage={() => 'Nenhum entregador encontrado'}
							loadOptions={loadDeliverymenOptrios}
							styles={customStylesSelectInput}
						/>
					</section>
					<section>
						<div>
							<Input
								label="Nome do produto"
								name="product"
								placeholder="Digite o nome do produto"
							/>
						</div>
					</section>
				</Form>
			</CardStyled>
		</>
	);
}
