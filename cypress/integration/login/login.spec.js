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

			cy.get('form button')
				.contains('Entrar no sistema')
				.click();

			cy.get(
				'.Toastify .Toastify__toast--error > .Toastify__toast-body'
			).contains('Falha na autenticação, verifique seus dados');
		});

		it('Verificar se o email esta escrito corretamente e tentar logar', () => {
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

			cy.get(
				'.Toastify .Toastify__toast--error > .Toastify__toast-body'
			).contains('Falha na autenticação, verifique seus dados');
		});

		it('Verificar email e senha corretos e logar na aplicação', () => {
			cy.login('admin@fastfeet.com', '123456');

			cy.url().should('include', '/packages');
		});
	});
});
