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
import MoreAction from '~/components/MoreAction';
import InternFooter from '~/components/InternFooter';

export default function Recipient() {
	const [recipient, setRecipient] = useState([]);
	const [loader, setLoader] = useState(true);
	const [page, setPage] = useState(1);

	async function loadRecipients() {
		const response = await api.get('recipients', {
			params: {
				page,
			},
		});
		setRecipient(response.data);
		setLoader(false);
	}

	useEffect(() => {
		loadRecipients();
	}, [page]);

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

	async function handleSearch({ search }) {
		setPage(1);
		const response = await api.get('/recipients', {
			params: {
				q: search,
				page,
			},
		});

		setRecipient(response.data);
	}

	return (
		<>
			<h1>Gerenciando destinatários</h1>

			<InternHeader>
				<Form onSubmit={handleSearch}>
					<Input
						name="search"
						placeholder="Buscar por detinatário"
						icon={<MdSearch color="#999999" size={16} />}
					/>
				</Form>

				<Button onClick={() => history.push('/recipients/new')}>
					<MdAdd color="#fff" size={20} /> Cadastrar
				</Button>
			</InternHeader>
			<div>
				<Table header={['ID', 'Nome', 'Endereço', 'Ações']}>
					{recipient.map(recipient => (
						<tr key={recipient.id.toString()}>
							<td>{recipient.id}</td>
							<td>{recipient.name}</td>
							<td>
								{`${recipient.street} ${recipient.number} `}
								{recipient.complement && `${recipient.complement} `}
								{`${recipient.city} - ${recipient.state}`}
							</td>
							<td>
								<MoreAction key={`Action_${recipient.id.toString()}`}>
									<div>
										<button
											onClick={() =>
												history.push(`/recipients/${recipient.id}/edit`)
											}
											type="button"
										>
											<MdEdit color="#4D85EE" size={15} />
											<span>Editar</span>
										</button>
									</div>
									<div>
										<button
											onClick={() => handleDelete(recipient.id)}
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
