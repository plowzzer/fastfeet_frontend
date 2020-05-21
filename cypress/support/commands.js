// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
Cypress.Commands.add(
	'login',
	(email = 'admin@fastfeet.com', password = '123456') => {
		cy.visit('http://localhost:3000/');
		cy.get('#email').type(email);
		cy.get('#password').type(password);
		cy.get('form button').click();
	}
);

Cypress.Commands.add('loginSTUB', () => {
	const user = '{"auth":"{\\"token\\":\\"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTg5OTI1NzE3LCJleHAiOjE1OTA1MzA1MTd9.reTHZJB1eI_MYJJubAS7ALRRnkFikW9wVCPOfsGlxyw\\",\\"signed\\":true,\\"loading\\":false}","user":"{\\"profile\\":{\\"id\\":1,\\"name\\":\\"Distribuidora Fastfeet\\",\\"email\\":\\"admin@fastfeet.com\\"}}","_persist":"{\\"version\\":-1,\\"rehydrated\\":true}"}'
	localStorage.setItem(
		'persist:fastfeet',
		user
	);
});
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
