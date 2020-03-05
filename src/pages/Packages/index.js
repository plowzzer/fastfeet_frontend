import React, { useEffect, useState } from 'react';
import {
	MdSearch,
	MdEdit,
	MdDeleteForever,
	MdRemoveRedEye,
	MdAdd,
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
import Status from '~/components/Status';
import MoreAction from '~/components/MoreAction';
import DeliveryManPicture from '~/components/DeliveryManPicture';
import DeliveryModal from './DetailModal';

export default function Packages() {
	const [packages, setPackages] = useState([]);
	const [loader, setLoader] = useState(true);

	async function loadPackages() {
		const response = await api.get('packages');
		setPackages(response.data);
		setLoader(false);
	}

	useEffect(() => {
		setLoader(true);
		loadPackages();
	}, []);

	async function handleDelete(id) {
		const confirm = window.confirm('Você tem certeza que deseja deletar isso?');

		if (!confirm) {
			toast.error('Encomenda não apagada!');
			return;
		}

		try {
			await api.delete(`/packages/${id}`);
			loadPackages();
			toast.success('Encomenda apagada com sucesso!');
		} catch (err) {
			toast.error('Essa encomenda não pode ser deletada!');
		}
	}

	async function handleSearch(search) {}

	return (
		<>
			<h1>Gerenciando encomendas</h1>

			<InternHeader>
				<Form onSubmit={handleSearch}>
					<Input
						name="search"
						placeholder="Buscar por encomendas"
						icon={<MdSearch color="#999999" size={16} />}
					/>
				</Form>

				<Button onClick={() => history.push('/packages/new')}>
					<MdAdd color="#fff" size={20} /> Cadastrar
				</Button>
			</InternHeader>
			<div>
				<Table
					header={[
						'ID',
						'Destinatário',
						'Entregador',
						'Cidade',
						'Estado',
						'Status',
						'Ações',
					]}
				>
					{packages.map(pack => (
						<tr key={pack.id.toString()}>
							<td>{pack.id}</td>
							<td>{pack.product}</td>
							<td>
								<DeliveryManPicture item={pack.deliveryman} />
							</td>
							<td>{pack.recipient.city}</td>
							<td>{pack.recipient.state}</td>
							<td>
								<Status item={pack} />
							</td>
							<td>
								<MoreAction>
									<div>
										<DeliveryModal
											trigger={
												<>
													<MdRemoveRedEye color="#8E5BE8" size={15} />
													<span>Visualizar</span>
												</>
											}
											data={pack}
										/>
									</div>
									<div>
										<button
											onClick={() => history.push(`/packages/${pack.id}/edit`)}
											type="button"
										>
											<MdEdit color="#4D85EE" size={15} />
											<span>Editar</span>
										</button>
									</div>
									<div>
										<button onClick={() => handleDelete(pack.id)} type="button">
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
			</div>
		</>
	);
}
