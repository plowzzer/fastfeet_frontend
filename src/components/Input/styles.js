import styled from 'styled-components';

export const Container = styled.div`
	position: relative;
	svg {
		position: absolute;
		top: 14px;
		left: 14px;
	}
	input {
		padding: ${props => (props.icon ? '12px 16px 12px 38px' : '12px 16px')};
	}
`;

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
