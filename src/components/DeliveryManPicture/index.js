import React from 'react';

import { UserRow } from './styles';

export default function DeliveryManPicture({ item, onlyPicture }) {
	return (
		<UserRow>
			<img src={item.avatar.url} alt={item.name} />
			{!onlyPicture && <span>{item.name}</span>}
		</UserRow>
	);
}
