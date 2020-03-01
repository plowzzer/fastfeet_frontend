import React from 'react';
import Popup from 'reactjs-popup';

// import { Container } from './styles';

export default function Modal({ trigger, children }) {
	return (
		<Popup
			trigger={<button className="button"> {trigger} </button>}
			modal
			closeOnDocumentClick
		>
			<div>TESTE</div>
		</Popup>
	);
}
