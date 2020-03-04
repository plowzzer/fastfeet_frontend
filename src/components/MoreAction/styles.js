import styled from 'styled-components';

export const Container = styled.div`
	padding: 5px;
	> div {
		display: flex;
		align-items: center;
		padding: 6px 0;
		border-top: 1px solid #eee;
		button {
			background: none;
			border: none;
			display: flex;
		}
		svg {
			margin-right: 8px;
		}
		span {
			font-size: 16px;
			color: #999;
		}
		:first-child {
			border-top: none;
		}
	}
`;

export const ButtonStyled = styled.button`
	background: transparent;
	border: none;
`;
