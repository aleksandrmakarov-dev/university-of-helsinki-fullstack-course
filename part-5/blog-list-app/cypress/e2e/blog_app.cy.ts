describe('blog app', () => {
  beforeEach(() => {
    cy.request('POST', `${Cypress.env('backend')}/api/testing/reset`);

    cy.request('POST', `${Cypress.env('backend')}/api/users`, {
      username: 'root',
      name: 'Root User',
      password: 'root123',
    });

    cy.request('POST', `${Cypress.env('backend')}/api/users`, {
      username: 'user2',
      name: 'User2',
      password: 'user123',
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

  describe('When logged in', () => {
    beforeEach(() => {
      cy.login({ username: 'root', password: 'root123' });
    });

    it('A blog can be created', () => {
      cy.contains('New blog').click();
      cy.get('[data-testid=input-title]').type('My first project');
      cy.get('[data-testid=input-author]').type('Dan Abramov');
      cy.get('[data-testid=input-url]').type('https://react.dev/');

      cy.contains('Save').click();
      cy.contains('New blog has been created successfully');
      cy.contains('My first project');
      cy.contains('by Dan Abramov');
    });

    describe('When blog created', () => {
      beforeEach(() => {
        cy.createBlog({
          title: 'My first project',
          author: 'Dan Abramov',
          url: 'https://react.dev/',
          likes: 0,
        });

        cy.createBlog({
          title: 'My second project',
          author: 'Dan Abramov 2',
          url: 'https://react.dev/2',
          likes: 0,
        });

        cy.createBlog({
          title: 'My third project',
          author: 'Dan Abramov 3',
          url: 'https://react.dev/3',
          likes: 0,
        });
      });

      it('users can like a blog', () => {
        cy.get('[data-testid=blog-item]').first().as('item');

        cy.get('@item').find('[data-testid=toggleBtn]').click();
        cy.get('@item').find('[data-testid=like-btn]').click();
        cy.get('@item').find('[data-testid=like-btn]').parent().find('p').should('contain', '1');
      });

      it('user who created a blog can delete it', () => {
        cy.get('[data-testid=blog-item]').first().as('item');

        cy.get('@item').find('[data-testid=toggleBtn]').click();
        cy.get('@item').find('[data-testid=delete-btn]').click();
        cy.contains('Blog has been deleted successfully');
      });

      it('only the creator can see the delete button of a blog, not anyone else', () => {
        cy.login({
          username: 'user2',
          password: 'user123',
        });

        cy.get('[data-testid=blog-item]').first().as('item');
        cy.get('@item').find('[data-testid=toggleBtn]').click();
        cy.get('@item').get('[data-testid=toggleContainer]').get('[data-testid=delete-btn]').should('not.exist');
      });

      it('ordered by likes', () => {
        cy.get('[data-testid=blog-item]').as('items');

        cy.get('@items').eq(2).find('[data-testid=toggleBtn]').click();
        cy.wait(200);
        cy.get('@items').eq(2).find('[data-testid=like-btn]').click();
        cy.wait(200);

        cy.get('[data-testid=blog-item]').last().as('item');

        cy.get('@items').eq(2).find('[data-testid=toggleBtn]').click();
        cy.wait(200);
        cy.get('@items').eq(2).find('[data-testid=like-btn]').click();
        cy.wait(200);
        cy.get('@items').eq(1).find('[data-testid=like-btn]').click();

        cy.get('[data-testid=blog-item]').as('items');

        cy.get('@items').eq(0).contains('My third project');
        cy.get('@items').eq(1).contains('My second project');
        cy.get('@items').eq(2).contains('My first project');
      });
    });
  });
});
