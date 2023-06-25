describe('Note app', function () {
  beforeEach(function () {
    cy.request('POST', `${Cypress.env('backend')}/api/testing/reset`);
    const user = {
      name: 'Root User',
      username: 'root',
      password: 'root123',
    };
    cy.request('POST', `${Cypress.env('backend')}/api/users/`, user);

    cy.visit('http://localhost:3000');
  });

  it('front page can be opened', function () {
    cy.contains('Notes');
  });

  it('login form can be opened', function () {
    cy.contains('Log in').click();
    cy.get('[data-testid=input-username]').type('root');
    cy.get('[data-testid=input-password]').type('root123');
    cy.get('[data-testid=login-btn').click();
    cy.contains('Hello, Root User');
  });

  it('login fails with wrong password', function () {
    cy.contains('Log in').click();
    cy.get('[data-testid=input-username]').type('root');
    cy.get('[data-testid=input-password]').type('invalidpassword');
    cy.get('[data-testid=login-btn').click();
    cy.get('[data-testid=toast').should('contain', 'Invalid username or password');
    cy.get('html').should('not.contain', 'Hello, Root User');
  });

  describe('when logged in', function () {
    beforeEach(function () {
      // cy.contains('Log in').click();
      // cy.get('[data-testid=input-username]').type('root');
      // cy.get('[data-testid=input-password]').type('root123');
      // cy.get('[data-testid=login-btn').click();

      cy.login({ username: 'root', password: 'root123' });
    });

    it('a new note can be created', function () {
      cy.contains('New note').click();
      cy.get('[data-testid=input-note]').type('a note created by cypress');
      cy.contains('Save').click();
      cy.contains('a note created by cypress');
    });

    describe('and a note exists', function () {
      beforeEach(function () {
        cy.createNote({ content: 'first note', important: false });
        cy.createNote({ content: 'second note', important: false });
        cy.createNote({ content: 'third note', important: false });
      });

      it('can change importance of note', function () {
        cy.contains('second note').parent().find('button').contains('Make important').click();
        cy.contains('second note').parent().find('button').should('contain', 'Make not important');
      });
    });
  });
});
