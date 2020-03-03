import styled from 'styled-components';

export const HeaderStyled = styled.header`
	display: flex;
	width: 100%;
	justify-content: space-between;
	align-items: center;
	margin: 15px 0 0;

	input {
		margin-bottom: 0px;
	}
`;

export const MoreConainer = styled.div`
	padding: 10px;
	> div {
		display: flex;
		align-items: center;
		padding-bottom: 6px;
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
		:nth-last-child(-n + 2) {
			padding-top: 6px;
			border-top: 1px solid #eee;
		}
		:nth-last-child(1) {
			padding-bottom: 0;
		}
	}
`;
