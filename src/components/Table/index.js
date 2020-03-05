import React from 'react';

import { TableStyled } from './styles';

export default function Table({ header, children }) {
	return (
		<>
			<TableStyled>
				<thead>
					<tr key="header">
						{header.map(item => (
							<th>{item}</th>
						))}
					</tr>
				</thead>
				<tbody>{children}</tbody>
			</TableStyled>
		</>
	);
}
