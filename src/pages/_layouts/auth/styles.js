import styled from 'styled-components';

export const Wrapper = styled.div`
	height: 100%;
	background: #7d40e7;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

export const Content = styled.div`
	width: 100%;
	max-width: 330px;
	text-align: center;
	padding: 30px;
	background: white;
	border-radius: 4px;
	display: flex;
	flex-direction: column;
	img {
		max-width: 90%;
		margin-bottom: 30px;
	}
`;
