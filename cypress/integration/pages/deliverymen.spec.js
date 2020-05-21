context('Testes de Encomendas', () => {
	beforeEach(() => {
		cy.loginSTUB();
		// cy.server();
		// cy.route('GET', '**/deliverymen?page=1', 'fixture:deliverymen/getPage=1.json').as(
		// 	'getPage=1'
		// );
	});

	describe('Render brasico da tela de deliverymen', () => {
		it('Abrir tela de deliveryman', () => {
			cy.visit('http://localhost:3000/deliverymen');
			cy.url().should('include', '/deliverymen');
			// cy.wait(['@getPage=1']);
		});

		it('Render basico do header', () => {
			cy.visit('http://localhost:3000/deliverymen');

			cy.get('[data-test=header] nav')
				.children()
				.should('have.length', 5);

			cy.get('[data-test=header] nav')
				.children(2)
				.contains('Encomendas')
				.should('have.attr', 'href', '/packages')
				.should('not.have.class', 'active');

			cy.get('[data-test=header] nav')
				.children(3)
				.contains('Entregadores')
				.should('have.attr', 'href', '/deliverymen')
				.should('have.class', 'active');

			cy.get('[data-test=header] nav')
				.children(4)
				.contains('Destinatários')
				.should('have.attr', 'href', '/recipients')
				.should('not.have.class', 'active');

			cy.get('[data-test=header] nav')
				.children(5)
				.contains('Problemas')
				.should('have.attr', 'href', '/problems')
				.should('not.have.class', 'active');
		});

		it('Verificar Header da página interna', () => {
			cy.visit('http://localhost:3000/deliverymen');
			// cy.wait(['@getPage=1']);
			cy.get('h1').contains('Gerenciando entregadores');

			cy.get('[data-test=sub-header] input')
				.should('have.value', '')
				.type('teste')
				.should('have.value', 'teste');

			cy.get('[data-test=sub-header] button')
				.contains('Cadastrar')
				.should('not.be.disabled');
		});

		it('Verificar Table e conteúdo da tabela', () => {
			cy.visit('http://localhost:3000/deliverymen');
			// cy.wait(['@getPage=1']);

			cy.get('table > thead > tr')
				.children()
				.should('have.length', 5);
			cy.get('table > thead > tr > :nth-child(1)').contains('ID');
			cy.get('table > thead > tr > :nth-child(2)').contains('Foto');
			cy.get('table > thead > tr > :nth-child(3)').contains('Nome');
			cy.get('table > thead > tr > :nth-child(4)').contains('Email');
			cy.get('table > thead > tr > :nth-child(5)').contains('Ações');

			cy.get('table > tbody > tr:nth-child(1) > td:nth-child(1)').contains('1');
			cy.get('table > tbody > tr:nth-child(1) > td:nth-child(2) img').should(
				'have.attr',
				'alt',
				'Marcelo Alcantara'
			);
			cy.get('table > tbody > tr:nth-child(1) > td:nth-child(3)').contains(
				'Marcelo Alcantara'
			);
			cy.get('table > tbody > tr:nth-child(1) > td:nth-child(4)').contains(
				'delivery@gogogo.com'
			);
			cy.get(
				'table > tbody > tr:nth-child(1) > td:nth-child(5) > button'
			).click();
			cy.get(
				'table > tbody > tr:nth-child(1) > td:nth-child(5) > .popup-content'
			).contains('Editar');
			cy.get(
				'table > tbody > tr:nth-child(1) > td:nth-child(5) > .popup-content'
			).contains('Excluir');
		});
	});
});
