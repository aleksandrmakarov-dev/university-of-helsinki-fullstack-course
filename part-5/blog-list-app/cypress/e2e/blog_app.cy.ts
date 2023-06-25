describe('blog app', () => {
  beforeEach(() => {

    const url = Cypress.env('backend');

    cy.request('POST', `${url}/api/testing/reset`);

    cy.request('POST', `${url}/api/users`, {
      username: 'root',
      name: 'Root User',
      password: 'root123',
    });

    cy.visit('');
  });

  it('login form is shown', () => {
    cy.contains('Log in').click();
    cy.contains('Log in Account');
  });

  describe('Login', () => {
    it('success with correct credentials', () => {
      cy.contains('Log in').click();
      cy.get('[data-testid=username]').type('root');
      cy.get('[data-testid=password]').type('root123');
      cy.get('[data-testid=login-btn').click();
      cy.contains('Hello, Root User');
    });

    it('fails with wrong credentials', () => {
      cy.contains('Log in').click();
      cy.get('[data-testid=username]').type('username');
      cy.get('[data-testid=password]').type('root123');
      cy.get('[data-testid=login-btn').click();
      cy.contains('Invalid username or password');
      cy.get('html').should('not.contain', 'Hello, Root User');
    });
  });
});
