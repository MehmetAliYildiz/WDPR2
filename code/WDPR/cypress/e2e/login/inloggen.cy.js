describe('Login form', () => {
  it('fills in email and password and submits', () => {
    cy.visit('http://localhost:3000/login');

    cy.get('input[type=email]')
      .type('test@test.com')
      .should('have.value', 'test@test.com');

    cy.get('input[type=password]')
      .type('Test123!')
      .should('have.value', 'Test123!');

    cy.get('button').click();
    cy.url().should('include', '/');
  });
});