import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useField } from '@unform/core';

import { LabelStyled, Container, InputStyled, ErrorStyled } from './styles';

export default function InputMask({ name, mask, label, icon, ...rest }) {
	const inputRef = useRef(null);
	const { fieldName, defaultValue = '', registerField, error } = useField(name);

	useEffect(() => {
		registerField({
			name: fieldName,
			ref: inputRef.current,
			path: 'value',
			setValue(ref, value) {
				ref.setInputValue(value);
			},
			clearValue(ref) {
				ref.setInputValue('');
			},
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
					mask={mask}
					{...rest}
				/>
			</Container>
			{error && <ErrorStyled>{error}</ErrorStyled>}
		</>
	);
}

InputMask.defaultProps = {
	name: '',
	label: '',
	icon: null,
	mask: '',
};

InputMask.propTypes = {
	name: PropTypes.string,
	label: PropTypes.string,
	icon: PropTypes.element,
	mask: PropTypes.string,
};
