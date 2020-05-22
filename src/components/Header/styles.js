import styled from 'styled-components';

export const Container = styled.header`
	background: #fff;
	padding: 0 30px;
`;

export const Content = styled.div`
	height: 64px;
	max-width: 100%;
	display: flex;
	justify-content: space-between;
	align-items: center;

	nav {
		display: flex;
		align-items: center;

		img {
			width: 135px;
			margin-right: 20px;
			padding-right: 20px;
		}

		a {
			padding: 3px;
			margin: 0 3px;
			text-transform: uppercase;
			font-size: 15px;
			font-weight: bold;
			color: #999999;
			&.active {
				color: #444444;
			}
		}
	}

	aside {
		display: flex;
		align-items: center;
	}
`;

export const Profile = styled.div`
	display: flex;
	flex-direction: column;
	margin-left: 20px;
	padding-left: 20px;
	border-left: 1px solid #eee;

	strong {
		display: block;
		color: #333;
		font-size: 14px;
	}

	a {
		display: block;
		margin-top: 5px;
		font-size: 14px;
		color: #de3b3b;
		text-align: right;
	}
`;
