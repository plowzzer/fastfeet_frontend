import React from 'react';
import { MdMoreHoriz } from 'react-icons/md';
import Popup from 'reactjs-popup';

// import { Container } from './styles';

export default function MoreAction({ children, ...rest }) {
	return (
		<Popup
			trigger={
				<button type="button">
					<MdMoreHoriz color="#eee" size={20} />
				</button>
			}
			position="bottom center"
			contentStyle={{
				width: '200px',
				borderRadius: '4px',
			}}
			{...rest}
		>
			{children}
		</Popup>
	);
}
