import React from 'react';
import { MdMoreHoriz } from 'react-icons/md';
import Popup from 'reactjs-popup';
import styled from 'styled-components';

export const ButtonStyled = styled.button`
	background: transparent;
	border: none;
`;

export default function MoreAction({ children, ...rest }) {
	return (
		<Popup
			trigger={
				<ButtonStyled type="button">
					<MdMoreHoriz color="#C6C6C6" size={20} />
				</ButtonStyled>
			}
			on="hover"
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
