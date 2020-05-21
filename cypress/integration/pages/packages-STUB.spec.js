context('Testes de Encomendas', () => {
	beforeEach(() => {
		cy.loginSTUB();
		cy.server();
		cy.route('GET', '**/packages?page=1', 'fixture:packages/getPage=1.json').as(
			'getPage=1'
		);
	});

	describe('Render basico da tela de encomendas', () => {
		it('Abrir por padrão após login, a tela de encomendas', () => {
			cy.visit('http://localhost:3000/packages');
			cy.url().should('include', '/packages');
			cy.wait(['@getPage=1']);
		});

		it('Render basico do header e das informações de usuário logado', () => {
			cy.visit('http://localhost:3000/packages');
			cy.wait(['@getPage=1']);
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
			cy.get('[data-test=header] aside a')
				.contains('sair do sistema')
				.click();
			cy.url().should('be.equal', 'http://localhost:3000/#');
		});

		it('Verificar Header da página interna', () => {
			cy.visit('http://localhost:3000/packages');
			cy.wait(['@getPage=1']);
			cy.get('h1').contains('Gerenciando encomendas');

			cy.get('[data-test=sub-header] input')
				.should('have.value', '')
				.type('teste')
				.should('have.value', 'teste');

			cy.get('[data-test=sub-header] button')
				.contains('Cadastrar')
				.should('not.be.disabled');
		});

		it('Verificar Table e conteúdo da tabela', () => {
			cy.visit('http://localhost:3000/packages');
			cy.wait(['@getPage=1']);

			cy.get('table > thead > tr')
				.children()
				.should('have.length', 7);
			cy.get('table > thead > tr > :nth-child(1)').contains('ID');
			cy.get('table > thead > tr > :nth-child(2)').contains('Destinatário');
			cy.get('table > thead > tr > :nth-child(3)').contains('Entregador');
			cy.get('table > thead > tr > :nth-child(4)').contains('Cidade');
			cy.get('table > thead > tr > :nth-child(5)').contains('Estado');
			cy.get('table > thead > tr > :nth-child(6)').contains('Status');
			cy.get('table > thead > tr > :nth-child(7)').contains('Ações');

			cy.get('table > tbody > tr:nth-child(1) > td:nth-child(1)').contains('2');
			cy.get('table > tbody > tr:nth-child(1) > td:nth-child(2)').contains(
				'Fabiana Medeiros'
			);
			cy.get('table > tbody > tr:nth-child(1) > td:nth-child(3) img').should(
				'have.attr',
				'alt',
				'Marcelo Alcantara'
			);
			cy.get('table > tbody > tr:nth-child(1) > td:nth-child(3)').contains(
				'Marcelo Alcantara'
			);
			cy.get('table > tbody > tr:nth-child(1) > td:nth-child(4)').contains(
				'Bonfim Paulista'
			);
			cy.get('table > tbody > tr:nth-child(1) > td:nth-child(5)').contains(
				'SP'
			);
			cy.get('table > tbody > tr:nth-child(1) > td:nth-child(6)').contains(
				'Cancelado'
			);
			cy.get(
				'table > tbody > tr:nth-child(1) > td:nth-child(7) > button'
			).click();
			cy.get(
				'table > tbody > tr:nth-child(1) > td:nth-child(7) > .popup-content'
			)
				.should('be.visible')
				.contains('Visualizar');
			cy.get(
				'table > tbody > tr:nth-child(1) > td:nth-child(7) > .popup-content'
			).contains('Editar');
			cy.get(
				'table > tbody > tr:nth-child(1) > td:nth-child(7) > .popup-content'
			).contains('Excluir');
		});

		it('Adicionar novo cadastro de encomenda', () => {
			cy.route(
				'GET',
				'**/recipients?q=F',
				'fixture:recipients/recipients?q=F.json'
			).as('recipients=F');
			cy.route(
				'GET',
				'**/deliverymen?q=M',
				'fixture:deliverymen/deliverymen?q=M.json'
			).as('deliverymen=M');
			cy.route('POST', '**/packages', 'fixture:packages/newPost.json').as(
				'newPost'
			);
			cy.visit('http://localhost:3000/packages');
			cy.wait(['@getPage=1']);

			cy.get('[data-test=sub-header] button')
				.contains('Cadastrar')
				.click();

			cy.url().should('include', '/packages/new');

			cy.get('h1').contains('Cadastro de encomendas');
			cy.get('[data-test=sub-header] > nav > button:nth-child(1)').contains(
				'Voltar'
			);
			cy.get('[data-test=sub-header] > nav > button:nth-child(2)').contains(
				'Salvar'
			);

			cy.get('form > section:nth-child(1) > div:nth-child(1) > div')
				.click()
				.type('F');
			cy.wait(['@recipients=F']);
			cy.get('#react-select-2-option-0')
				.contains('Fabiana Medeiros')
				.click();

			cy.get('form > section:nth-child(1) > div:nth-child(2) > div')
				.click()
				.type('M');
			cy.wait(['@deliverymen=M']);
			cy.get('#react-select-3-option-0')
				.contains('Marcelo Alcantara')
				.click();

			cy.get('input#product').type('Product test');

			cy.get('[data-test=sub-header] > nav > button:nth-child(2)')
				.contains('Salvar')
				.click();
			cy.wait(['@newPost']);

			cy.get(
				'.Toastify .Toastify__toast--success > .Toastify__toast-body'
			).contains('Encomenda criada com sucesso!');
		});
	});
});
