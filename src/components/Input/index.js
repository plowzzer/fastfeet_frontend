import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useField } from '@unform/core';

import { LabelStyled, Container, InputStyled, ErrorStyled } from './styles';

export default function Input({ name, label, icon, ...rest }) {
	const inputRef = useRef(null);
	const { fieldName, defaultValue = '', registerField, error } = useField(name);

	useEffect(() => {
		registerField({
			name: fieldName,
			ref: inputRef.current,
			path: 'value',
		});
	}, [fieldName, registerField]);

	return (
		<>
			{label && <LabelStyled htmlFor={fieldName}>{label}</LabelStyled>}
			<Container icon={icon}>
				{icon}
				<InputStyled
					ref={inputRef}
					id={fieldName}
					defaultValue={defaultValue}
					{...rest}
				/>
			</Container>
			{error && <ErrorStyled>{error}</ErrorStyled>}
		</>
	);
}

Input.defaultProps = {
	name: '',
	label: '',
	icon: null,
};

Input.propTypes = {
	name: PropTypes.string,
	label: PropTypes.string,
	icon: PropTypes.element,
};
