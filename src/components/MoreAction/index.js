import React from 'react';
import { MdMoreHoriz } from 'react-icons/md';
import Popup from 'reactjs-popup';

import { Container, ButtonStyled } from './styles';

export default function MoreAction({ children, ...rest }) {
	return (
		<Popup
			trigger={
				<ButtonStyled type="button">
					<MdMoreHoriz color="#C6C6C6" size={20} />
				</ButtonStyled>
			}
			// on="hover"
			position="bottom center"
			contentStyle={{
				width: '200px',
				borderRadius: '4px',
			}}
			{...rest}
		>
			<Container>{children}</Container>
		</Popup>
	);
}
