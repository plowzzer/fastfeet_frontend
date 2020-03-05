import React, { useEffect, useState } from 'react';
import { MdRemoveRedEye, MdDeleteForever } from 'react-icons/md';
import { toast } from 'react-toastify';

import api from '~/services/api';

import LoaderSpinner from '~/components/LoaderSpinner';
import Table from '~/components/Table';
import MoreAction from '~/components/MoreAction';
import DeliveryModal from './DetailModal';

export default function Problems() {
	const [problems, setProblems] = useState([]);
	const [loader, setLoader] = useState(true);

	async function loadRecipients() {
		const response = await api.get('problems');
		setProblems(response.data);
		setLoader(false);
	}

	useEffect(() => {
		loadRecipients();
	}, []);

	async function handleDelete(id) {
		const confirm = window.confirm('Você tem certeza que deseja deletar isso?');

		if (!confirm) {
			toast.error('Destinatário não apagado!');
			return;
		}

		try {
			await api.delete(`/recipients/${id}`);
			loadRecipients();
			toast.success('Destinatário apagado com sucesso!');
		} catch (err) {
			toast.error('Esse destinatário não pode ser apagado!');
		}
	}

	return (
		<>
			<h1>Problemas na entrega</h1>
			<div>
				<Table header={['Encomenda', 'Problema', 'Ações']}>
					{problems.map(problem => (
						<tr key={problem.id.toString()}>
							<td>{problem.package.id}</td>
							<td>{problem.description}</td>
							<td>
								<MoreAction key={`Action_${problem.id.toString()}`}>
									<div>
										<DeliveryModal
											trigger={
												<>
													<MdRemoveRedEye color="#8E5BE8" size={15} />
													<span>Visualizar</span>
												</>
											}
											data={problem}
										/>
									</div>
									<div>
										<button
											onClick={() => handleDelete(problem.id)}
											type="button"
										>
											<MdDeleteForever color="#DE3B3B" size={15} />
											<span>Cancelar encomenda</span>
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
