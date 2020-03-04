import React from 'react';
import styled from 'styled-components';

export const HeaderStyled = styled.header`
	display: flex;
	width: 100%;
	justify-content: space-between;
	align-items: center;
	margin: 15px 0 15px;

	nav {
		display: flex;
		button {
			margin-left: 15px;
		}
	}
	input {
		margin-bottom: 0px;
	}
`;

export default function InternHeader({ children }) {
	return <HeaderStyled>{children}</HeaderStyled>;
}
