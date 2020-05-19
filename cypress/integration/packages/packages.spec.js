context('Testes de Encomendas', () => {
	beforeEach(() => {
		cy.login();
	});

	describe('Render basico da tela de encomendas', () => {
		it('Abrir por padrão após login, a tela de encomendas', () => {
			cy.url().should('include', '/packages');
		});

		it('Render basico do header e das informações de usuário logado', () => {
			cy.visit('http://localhost:3000/packages');
			cy.get('[data-test=header] nav')
				.children()
				.should('have.length', 5);

			cy.get('[data-test=header] nav')
				.children(2)
				.contains('Encomendas')
				.should('have.attr', 'href', '/packages')
				.should('have.class', 'active');

			cy.get('[data-test=header] nav')
				.children(3)
				.contains('Entregadores')
				.should('have.attr', 'href', '/deliverymen')
				.should('not.have.class', 'active');

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

			cy.get('[data-test=header] aside strong').contains(
				'Distribuidora Fastfeet'
			);
			cy.get('[data-test=header] aside a').contains('sair do sistema');
		});
	});
});
