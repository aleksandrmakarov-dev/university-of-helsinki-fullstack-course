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
  }).then(_ => {
    localStorage.setItem('user', JSON.stringify(_.body));
    cy.visit('');
  });
});

Cypress.Commands.add('createBlog', ({ title, author, url, likes }) => {
  const json = localStorage.getItem('user') ?? '';
  const user = JSON.parse(json);

  cy.request({
    url: `${Cypress.env('backend')}/api/blogs`,
    method: 'POST',
    body: {
      title,
      author,
      url,
      likes,
    },
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  }).then(_ => {
    cy.visit('');
  });
});

declare namespace Cypress {
  interface Chainable {
    login({ username, password }: { username: string; password: string }): void;
    createBlog({ title, author, url, likes }: { title: string; author: string; url: string; likes: number }): void;
  }
}
