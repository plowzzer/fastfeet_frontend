import React, { useEffect, useRef } from 'react';
import { useField } from '@unform/core';

import { LabelStyled, InputStyled, ErrorStyled } from './styles';

export default function Input({ name, label, ...rest }) {
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
			<InputStyled
				ref={inputRef}
				id={fieldName}
				defaultValue={defaultValue}
				{...rest}
			/>
			{error && <ErrorStyled>{error}</ErrorStyled>}
		</>
	);
}
