import React from 'react';
import PropTypes from 'prop-types';
import Modal from '~/components/Modal';

import { Container } from './styles';

export default function DetailModal({ trigger, data }) {
	return (
		<Modal trigger={trigger}>
			<Container>
				<h3>Visualizar Problema</h3>
				<p>{data.description}</p>
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
