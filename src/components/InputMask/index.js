import React, { useRef, useEffect } from 'react';
import ReactInputMask, { Props as InputProps } from 'react-input-mask';
import { useField } from '@unform/core';

import { LabelStyled, Container, InputStyled, ErrorStyled } from './styles';

export default function InputMask({ name, mask, label, ...rest }) {
	const inputRef = useRef(null);
	const { fieldName, registerField, defaultValue, error } = useField(name);

	useEffect(() => {
		registerField({
			name: fieldName,

			ref: inputRef.current,

			path: 'value',

			setValue(ref, value) {
				ref.setInputValue('');
			},

			clearValue(ref) {
				ref.setInputValue('');
			},
		});
	}, [fieldName, registerField]);
	return (
		<>
			{label && <LabelStyled htmlFor={fieldName}>{label}</LabelStyled>}
			<Container>
				<InputStyled
					ref={inputRef}
					defaultValue={defaultValue}
					mask={mask}
					{...rest}
				/>
			</Container>
			{error && <ErrorStyled>{error}</ErrorStyled>}
		</>
	);
}
