import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

export const HeaderStyled = styled.header`
	display: flex;
	width: 100%;
	justify-content: space-between;
	align-items: center;
	margin: 15px 0 15px;

	nav {
		display: flex;
		button {
			margin-left: 15px;
		}
	}
	form {
		min-width: 250px;
	}
	input {
		margin-bottom: 0px;
	}
`;

export default function InternHeader({ children }) {
	return <HeaderStyled data-test="sub-header">{children}</HeaderStyled>;
}

InternHeader.defaultProps = {
	children: '',
};

InternHeader.propTypes = {
	children: PropTypes.string,
};
