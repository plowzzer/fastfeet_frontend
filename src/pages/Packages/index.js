import React from 'react';
import { MdSearch } from 'react-icons/md';
import Input from '~/components/Input';
import Button from '~/components/Button';

import { Form } from '@unform/web';

// import { Container } from './styles';

export default function Packages() {
	return (
		<>
			<h1>Gerenciando encomendas</h1>

			<div>
				<Form>
					<Input
						name="search"
						placeholder="Buscar por encomendas"
						icon={<MdSearch color="#999999" size={16} />}
					/>
				</Form>

				<Button>+ Cadastrar</Button>
			</div>
		</>
	);
}
