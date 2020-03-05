import Loader from 'react-loader-spinner';
import React from 'react';

// import { Container } from './styles';

export default function LoaderSpinner({ color, height, width }) {
	return (
		<Loader
			type="TailSpin"
			color={color || '#7D40E7'}
			height={height || '30px'}
			width={width || '30px'}
			style={{
				display: 'flex',
				width: '100%',
				justifyContent: 'center',
				margin: '15px',
			}}
		/>
	);
}
