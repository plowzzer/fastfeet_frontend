import React, { useEffect, useState } from 'react';
import {
	MdSearch,
	MdAdd,
	MdEdit,
	MdDeleteForever,
	MdChevronLeft,
	MdChevronRight,
} from 'react-icons/md';
import { toast } from 'react-toastify';

import { Form } from '@unform/web';

import api from '~/services/api';
import history from '~/services/history';

import LoaderSpinner from '~/components/LoaderSpinner';
import InternHeader from '~/components/InternHeader';
import Input from '~/components/Input';
import Button from '~/components/Button';
import Table from '~/components/Table';
import DeliveryManPicture from '~/components/DeliveryManPicture';
import MoreAction from '~/components/MoreAction';
import InternFooter from '~/components/InternFooter';

export default function Deliverymen() {
	const [deliverymen, setDeliveryman] = useState([]);
	const [loader, setLoader] = useState(true);
	const [page, setPage] = useState(1);

	async function loadDeliverymen() {
		const response = await api.get('deliverymen', {
			params: {
				page,
			},
		});
		setDeliveryman(response.data);
		setLoader(false);
	}

	useEffect(() => {
		loadDeliverymen();
	}, [page]);

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

	async function handleSearch({ search }) {
		setPage(1);
		const response = await api.get('/deliverymen', {
			params: {
				q: search,
				page,
			},
		});

		setDeliveryman(response.data);
	}

	return (
		<>
			<h1>Gerenciando entregadores</h1>

			<InternHeader>
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
			</InternHeader>
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
												history.push(`/deliverymen/${deliveryman.id}/edit`)
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
				{loader && <LoaderSpinner />}
				<InternFooter>
					<Button disabled={page === 1} onClick={() => setPage(page - 1)}>
						<MdChevronLeft color="#fff" size={20} />
					</Button>
					<Button onClick={() => setPage(page + 1)}>
						<MdChevronRight color="#fff" size={20} />
					</Button>
				</InternFooter>
			</div>
		</>
	);
}
