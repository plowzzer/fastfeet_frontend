import React, { useEffect, useState } from 'react';
import {
	MdSearch,
	MdEdit,
	MdDeleteForever,
	MdRemoveRedEye,
} from 'react-icons/md';
import { Form } from '@unform/web';

import api from '~/services/api';
import history from '~/services/history';

import Input from '~/components/Input';
import Button from '~/components/Button';
import Table from '~/components/Table';
import Status from '~/components/Status';
import MoreAction from '~/components/MoreAction';
import DeliveryMan from '~/components/DeliveryMan';
import DeliveryModal from './DetailModal';

import { MoreConainer } from './styles';

export default function Packages() {
	const [packages, setPackages] = useState([]);

	useEffect(() => {
		async function loadPackages() {
			const response = await api.get('packages');
			setPackages(response.data);
		}

		loadPackages();
	}, []);

	function handleDelete() {
		console.log('nothing');
	}

	return (
		<>
			<h1>Gerenciando encomendas</h1>

			<div>
				<Form>
					<Input
						name="search"
						placeholder="Buscar por encomendas"
						icon={<MdSearch color="#999999" size={16} />}
					/>
				</Form>

				<Button>+ Cadastrar</Button>
			</div>
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
					{packages.map(row => (
						<tr>
							<td>{row.id}</td>
							<td>{row.product}</td>
							<td>
								<DeliveryMan item={row.deliveryman} />
							</td>
							<td>{row.recipient.city}</td>
							<td>{row.recipient.state}</td>
							<td>
								<Status item={row} />
							</td>
							<MoreAction>
								<MoreConainer>
									<div>
										<DeliveryModal
											trigger={
												<>
													<MdRemoveRedEye color="#8E5BE8" size={15} />
													<span>Visualizar</span>
												</>
											}
											data={row}
										/>
									</div>
									<div>
										<button
											onClick={() => history.push(`/deliveries/form/${row.id}`)}
											type="button"
										>
											<MdEdit color="#4D85EE" size={15} />
											<span>Editar</span>
										</button>
									</div>
									<div>
										<button onClick={handleDelete} type="button">
											<MdDeleteForever color="#DE3B3B" size={15} />
											<span>Excluir</span>
										</button>
									</div>
								</MoreConainer>
							</MoreAction>
						</tr>
					))}
				</Table>
			</div>
		</>
	);
}
