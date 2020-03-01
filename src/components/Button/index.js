import React from 'react';
import PropTypes from 'prop-types';
import { ButtonStyled } from './styles';

export default function Button({ children, ...props }) {
	return <ButtonStyled {...props}>{children}</ButtonStyled>;
}

Button.defaultProps = {
	children: '',
	onClick: () => {},
};

Button.propTypes = {
	onClick: PropTypes.func,
	children: PropTypes.string,
};
