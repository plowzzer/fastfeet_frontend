context('Autenticação', () => {
	describe('Entre na tela de login', () => {
		it('Entrar na página de login', () => {
			cy.visit('http://localhost:3000/');
		});

		it('Verificar os elementos na tela e clicar no botão de login', () => {
			cy.visit('http://localhost:3000/');
			cy.get("#email[type='email']").should('have.value', '');
			cy.get("#email[type='email']").type('meuemail@email.com');
			cy.get("#email[type='email']").should('have.value', 'meuemail@email.com');
			cy.get("#email[type='email']").clear();

			cy.get("#password[type='password']").should('have.value', '');
			cy.get("#password[type='password']").type('123456');
			cy.get("#password[type='password']").should('have.value', '123456');
			cy.get("#password[type='password']").clear();

			cy.get('form button').contains('Entrar no sistema');
		});

		it('Verificar se o email esta escrito corretamente e tentar logar', () => {
			cy.server({ method: 'POST', status: 400 });
			cy.route(
				'POST',
				'**/sessions',
				'fixture:sessions/postValidation.json'
			).as('postSessionsValidation');

			cy.visit('http://localhost:3000/');
			cy.get('#email').type('teste');
			cy.get('form button').click();

			cy.get('#email').then($input => {
				expect($input[0].validationMessage).to.eq(
					"Please include an '@' in the email address. 'teste' is missing an '@'."
				);
			});

			cy.get('#email').type('@teste.com');
			cy.get('form button').click();

			cy.wait(['@postSessionsValidation']);

			cy.get(
				'.Toastify .Toastify__toast--error > .Toastify__toast-body'
			).contains('Falha na autenticação, verifique seus dados');
		});

		it('Tentar logar com um usuário não existente', () => {
			cy.server({ method: 'POST', status: 401 });
			cy.route('POST', '**/sessions', { error: 'User not found' }).as(
				'postSessionsNotFound'
			);

			cy.visit('http://localhost:3000/');
			cy.get("#email[type='email']").type('teste@teste.com');
			cy.get("#password[type='password']").type('123456');
			cy.get('form button').click();

			cy.wait(['@postSessionsNotFound']);

			cy.get(
				'.Toastify .Toastify__toast--error > .Toastify__toast-body'
			).contains('Falha na autenticação, verifique seus dados');
		});

		it('Verificar email e senha corretos e logar na aplicação', () => {
			cy.server();
			cy.route('POST', '**/sessions', 'fixture:sessions/postSuccess.json').as(
				'postSessions'
			);
			cy.route(
				'GET',
				'**/packages?page=1',
				'fixture:packages/getPage=1.json'
			).as('getPage=1');
			cy.login('admin@fastfeet.com', '123456');
			cy.wait(['@postSessions', '@getPage=1']);

			cy.url().should('include', '/packages');
		});
	});
});
