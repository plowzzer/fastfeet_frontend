import styled from 'styled-components';

export const TableStyled = styled.table`
	width: 100%;
	border-spacing: 0 10px;
	margin-top: 30px;

	thead th {
		text-align: left;
		color: #444444;
		padding: 14px;
		vertical-align: bottom;
	}

	tbody {
		tr {
			background-color: #fff;
		}
		td {
			padding: 16px 12px;
			vertical-align: middle;
			color: #666666;
		}
	}
`;
