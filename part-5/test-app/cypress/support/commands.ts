/* eslint-disable @typescript-eslint/no-namespace */
/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
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
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//

Cypress.Commands.add('login', ({ username, password }) => {
  cy.request('POST', `${Cypress.env('backend')}/api/auth/login`, {
    username,
    password,
  }).then(response => {
    localStorage.setItem('user', JSON.stringify(response.body));
    cy.visit('');
  });
});

Cypress.Commands.add('createNote', ({ content, important }) => {
  const json = localStorage.getItem('user') ?? '';
  const user = JSON.parse(json);

  cy.request({
    url: '/api/notes',
    method: 'POST',
    body: { content, important },
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  });

  cy.visit('');
});

declare namespace Cypress {
  interface Chainable {
    login({ username, password }: { username: string; password: string }): void;
    createNote({ content, important }: { content: string; important: boolean }): void;
  }
}
