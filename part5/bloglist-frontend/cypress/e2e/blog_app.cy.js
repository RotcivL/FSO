describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Matti Luukkainen',
      username: 'mluukkai',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('/')
  })

  it('Login form is shown', function() {
    cy.get('input#username')
    cy.get('input#password')
    cy.get('button').contains('login')
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.get('input#username').type('mluukkai')
      cy.get('input#password').type('salainen')
      cy.get('button').contains('login').click()

      cy.get('html').should('contain', 'Matti Luukkainen logged in')

      cy.get('.info')
        .should('contain', 'Successfully logged in')
        .and('have.css', 'color', 'rgb(0, 128, 0)')
    })

    it('fails with wrong credentials', function() {
      cy.get('input#username').type('mluukkai')
      cy.get('input#password').type('wrong')
      cy.get('button').contains('login').click()

      cy.get('html').should('not.contain', 'Matti Luukkainen logged in')

      cy.get('.alert')
        .should('contain', 'wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })
})