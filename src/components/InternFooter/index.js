import React from 'react';
import styled from 'styled-components';

export const Container = styled.div`
	display: flex;
	justify-content: end;
	margin: 20px 0;
	nav {
		display: flex;
		& > button {
			margin-left: 15px;
		}
	}
`;

export default function InternFooter({ children }) {
	return (
		<Container>
			<nav>{children}</nav>
		</Container>
	);
}
