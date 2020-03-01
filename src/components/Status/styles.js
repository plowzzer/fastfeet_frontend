import styled from 'styled-components';
import { lighten } from 'polished';

function statusColor(color) {
	switch (color) {
		case 'end':
			return `#2ca42b`;

		case 'pending':
			return `#C1BC35`;

		case 'start':
			return `#4d85ee`;

		case 'canceled':
			return `#DE3B3B`;

		default:
			return '#eee';
	}
}

export const StatusStyled = styled.span`
	text-transform: uppercase;
	padding: 3px 3px 3px 18px;
	font-size: 14px;
	font-weight: bold;
	border-radius: 10px;
	background-color: ${props =>
		props.name && lighten(0.35, statusColor(props.name))};
	position: relative;
	color: ${props => props.name && statusColor(props.name)};
	&:after {
		position: absolute;
		left: 4px;
		top: 6px;
		width: 10px;
		height: 10px;
		background: ${props => props.name && statusColor(props.name)};
		content: '';
		border-radius: 100%;
	}
`;

export const Pending = styled.span``;

export const Canceled = styled.span``;

export const Start = styled.span``;
