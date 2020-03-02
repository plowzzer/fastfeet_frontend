import React from 'react';

import { UserRow } from './styles';

export default function DeliveryMan({ item }) {
	return (
		<UserRow>
			<img src={item.avatar.url} alt={item.name} />
			<span>{item.name}</span>
		</UserRow>
	);
}