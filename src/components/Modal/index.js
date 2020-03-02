import React from 'react';
import Popup from 'reactjs-popup';
import PropTypes from 'prop-types';

export default function Modal({ trigger, children }) {
	return (
		<Popup
			trigger={<button type="button"> {trigger} </button>}
			modal
			closeOnDocumentClick
			contentStyle={{
				borderRadius: '4px',
			}}
		>
			{children}
		</Popup>
	);
}

Modal.defaultProps = {
	trigger: null,
	children: null,
};

Modal.propTypes = {
	trigger: PropTypes.element,
	children: PropTypes.element,
};
