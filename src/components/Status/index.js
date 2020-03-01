import React from 'react';
import PropTypes from 'prop-types';

import { StatusStyled } from './styles';

export default function Status({ item }) {
	function checkItem() {
		if (item.end_date) {
			return <StatusStyled name="end">Entregue</StatusStyled>;
		}

		if (!item.end_date && item.start_date && !item.canceled_at) {
			return <StatusStyled name="pending">Pendente</StatusStyled>;
		}

		if (!item.end_date && !item.start_date && !item.canceled_at) {
			return <StatusStyled name="start">Retirada</StatusStyled>;
		}

		if (item.canceled_at) {
			return <StatusStyled name="canceled">Cancelado</StatusStyled>;
		}

		return <StatusStyled> - </StatusStyled>;
	}

	return <>{checkItem(item)}</>;
}

Status.defaultProps = {
	item: {},
};

Status.propTypes = {
	item: PropTypes.element,
};
