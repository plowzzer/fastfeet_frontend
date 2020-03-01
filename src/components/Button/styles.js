import Styled from 'styled-components';

export const ButtonStyled = Styled.button`
	background-color: #7D40E7;
	border-radius: 4px;
	padding: 12px 24px;
	color: #FFF;
	font-size: 16px;
	font-weight: bold;
	border: none;
	${props => (props.block ? 'width:100%;' : 'width:auto')}
`;
