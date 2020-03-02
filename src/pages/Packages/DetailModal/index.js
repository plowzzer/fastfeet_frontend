import React from 'react';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Modal from '~/components/Modal';

import { Container } from './styles';

export default function DetailModal({ trigger, data }) {
	return (
		<Modal trigger={trigger}>
			<Container>
				<h3>Informações da encomenda</h3>
				<p>
					<strong>Nome do destinatário: </strong>
					{data.recipient.name}
				</p>
				<p>
					<strong>Nome do produto: </strong>
					{data.product}
				</p>
				<p>
					{data.recipient.street} - {data.recipient.number}{' '}
					{data.recipient.complement && ` - ${data.recipient.complement}`}
				</p>
				<p>
					{data.recipient.city} - {data.recipient.state}
				</p>
				<p>{data.recipient.cep}</p>
				<hr />
				<div>
					<h3>Datas</h3>
					<p>
						<strong>Retirada: </strong>
						{data.end_date
							? format(new Date(data.start_date), 'd/MM/y', { locale: pt })
							: ' - '}
					</p>
					<p>
						<strong>Entrega: </strong>
						{data.end_date
							? format(new Date(data.end_date), 'd/MM/y', { locale: pt })
							: ' - '}
					</p>
				</div>
				<hr />
				<div>
					<h3>Assinatura do destinatário</h3>
					{data.signature && (
						<img src={data.signature.url} alt="Assinatura do cliente" />
					)}
				</div>
			</Container>
		</Modal>
	);
}

DetailModal.defaultProps = {
	trigger: null,
	data: {},
};

DetailModal.propTypes = {
	trigger: PropTypes.element,
	data: PropTypes.element,
};
