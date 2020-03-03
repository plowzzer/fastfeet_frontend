import styled from 'styled-components';

export const HeaderStyled = styled.header`
	display: flex;
	width: 100%;
	justify-content: space-between;
	align-items: center;
	margin: 15px 0;
	div {
		display: flex;
		button {
			margin: 0 5px;
		}
	}
`;

export const CardStyled = styled.div`
	background: white;
	padding: 30px;
	border-radius: 4px;
	form {
		section {
			display: flex;
			justify-content: space-between;
			margin: 0px -15px 15px;
			& > div {
				padding: 0 15px;
				width: 100%;
			}
		}
	}
`;
