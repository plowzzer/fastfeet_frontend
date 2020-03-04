import React, { useEffect, useState } from 'react';
import { MdSearch, MdAdd, MdEdit, MdDeleteForever } from 'react-icons/md';
import { toast } from 'react-toastify';

import { Form } from '@unform/web';

import api from '~/services/api';
import history from '~/services/history';

import Input from '~/components/Input';
import Button from '~/components/Button';
import Table from '~/components/Table';
import DeliveryManPicture from '~/components/DeliveryManPicture';
import MoreAction from '~/components/MoreAction';

import { HeaderStyled } from './styles';

export default function Deliverymen() {
	const [deliverymen, setDeliveryman] = useState([]);

	async function loadDeliverymen() {
		const response = await api.get('deliverymen');
		setDeliveryman(response.data);
		console.log(response.data);
	}

	useEffect(() => {
		loadDeliverymen();
	}, []);

	async function handleDelete(id) {
		const confirm = window.confirm('Você tem certeza que deseja deletar isso?');

		if (!confirm) {
			toast.error('Entregador não apagado!');
			return;
		}

		try {
			await api.delete(`/deliverymen/${id}`);
			loadDeliverymen();
			toast.success('Entregador apagado com sucesso!');
		} catch (err) {
			toast.error('Esse entregador não pode ser apagado!');
		}
	}

	async function handleSearch(search) {}

	return (
		<>
			<h1>Gerenciando entregadores</h1>

			<HeaderStyled>
				<Form onSubmit={handleSearch}>
					<Input
						name="search"
						placeholder="Buscar por encomendas"
						icon={<MdSearch color="#999999" size={16} />}
					/>
				</Form>

				<Button onClick={() => history.push('/deliverymen/new')}>
					<MdAdd color="#fff" size={20} /> Cadastrar
				</Button>
			</HeaderStyled>
			<div>
				<Table header={['ID', 'Foto', 'Nome', 'Email', 'Ações']}>
					{deliverymen.map(deliveryman => (
						<tr key={deliveryman.id.toString()}>
							<td>{deliveryman.id}</td>
							<td>
								<DeliveryManPicture item={deliveryman} onlyPicture />
							</td>
							<td>{deliveryman.name}</td>
							<td>{deliveryman.email}</td>
							<td>
								<MoreAction key={`Action_${deliveryman.id.toString()}`}>
									<div>
										<button
											onClick={() =>
												history.push(`/packages/${deliveryman.id}/edit`)
											}
											type="button"
										>
											<MdEdit color="#4D85EE" size={15} />
											<span>Editar</span>
										</button>
									</div>
									<div>
										<button
											onClick={() => handleDelete(deliveryman.id)}
											type="button"
										>
											<MdDeleteForever color="#DE3B3B" size={15} />
											<span>Excluir</span>
										</button>
									</div>
								</MoreAction>
							</td>
						</tr>
					))}
				</Table>
			</div>
		</>
	);
}
