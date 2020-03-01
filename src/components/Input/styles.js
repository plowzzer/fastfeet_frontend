import styled from 'styled-components';

export const LabelStyled = styled.label`
	display: block;
	font-weight: bold;
	margin-bottom: 5px;
	text-align: left;
	text-transform: uppercase;
`;

export const InputStyled = styled.input`
	width: 100%;
	margin-bottom: 15px;
	padding: 12px 16px;
	border-radius: 4px;
	border: 1px solid #ddd;
	font-size: 15px;
	color: #444;
	transition: border-color 0.2s;
	&:focus {
		border-color: #7d40e7;
	}
`;

export const ErrorStyled = styled.span`
	color: '#f00';
`;
