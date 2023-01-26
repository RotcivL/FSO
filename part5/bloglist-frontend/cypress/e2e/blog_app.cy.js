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

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'mluukkai', password: 'salainen' })
    })

    it('A blog can be created', function() {
      cy.contains('new blog').click()
      cy.get('input#title').type('cypress test blog')
      cy.get('input#author').type('cypress test author')
      cy.get('input#url').type('http://www.cypresstest.com')
      cy.get('button').contains('create').click()

      cy.get('.blogOther').should('not.be.visible')
      cy.get('.blog')
        .should('contain', 'cypress test blog cypress test author')
        .get('button').contains('view').click()

      cy.get('.blogOther')
        .should('be.visible')
        .and('contain', 'http://www.cypresstest.com')
        .and('contain', 'likes 0')
        .and('contain', 'Matti Luukkainen')
        .and('contain', 'like')
        .and('contain', 'remove')
    })

    describe('Interact with existing blog', function() {
      beforeEach(function() {
        cy.createBlog({
          title: 'first cypress test blog',
          author: 'first cypress test author',
          url: 'http://www.firstcypresstest.com',
        })

        cy.contains('logout').click()

        const user = {
          name: 'John Smith',
          username: 'smith',
          password: 'jsmoih'
        }
        cy.request('POST', 'http://localhost:3003/api/users/', user)
        cy.login({ username: 'smith', password: 'jsmoih' })

        cy.createBlog({
          title: 'second cypress test blog',
          author: 'second cypress test author',
          url: 'second http://www.secondcypresstest.com',
          likes: 1
        })
      })

      it('Users can like blog they posted', function() {
        cy.contains('second cypress test blog').contains('view').click()

        cy.get('.likeButton').eq(0).click()

        cy.get('.info')
          .should('contain', 'blog second cypress test blog by second cypress test author likes increased')
          .and('have.css', 'color', 'rgb(0, 128, 0)')
      })

      it('Users can like blog someone else posted', function() {
        cy.contains('first cypress test blog').contains('view').click()

        cy.get('.likeButton').eq(1).click()

        cy.get('.info')
          .should('contain', 'blog first cypress test blog by first cypress test author likes increased')
          .and('have.css', 'color', 'rgb(0, 128, 0)')
      })

      it('user can delete blog they created', function() {
        cy.get('.blog').should('have.length', 2)
        cy.contains('second cypress test blog').contains('view').click()

        cy.get('.removeButton').eq(0).click()

        cy.get('.info')
          .should('contain', 'Successfully removed blog second cypress test blog by second cypress test author')
          .and('have.css', 'color', 'rgb(0, 128, 0)')
        cy.get('.blog')
          .should('have.length', 1)
          .and('not.contain', 'second cypress test blog')
      })

      it('user can not delete blog someone else created', function() {
        cy.get('.blog').should('have.length', 2)
        cy.contains('first cypress test blog').contains('view').click()

        cy.get('.removeButton').eq(1)
          .should('not.be.visible')
          .click({ force: true })

        cy.get('.alert')
          .should('contain', 'invalid user')
          .and('have.css', 'color', 'rgb(255, 0, 0)')
        cy.get('.blog')
          .should('have.length', 2)
      })

      describe('blog are sorted', function() {
        it('when a blog gets more likes it should be ordered first', function() {
          cy.get('.blog').eq(0).should('contain', 'second cypress test blog')
          cy.get('.blog').eq(1).should('contain', 'first cypress test blog')

          cy.get('.blog').eq(1).contains('view').click()
          cy.get('.likeButton').eq(1).click().click()

          cy.get('.blog').eq(0).should('contain', 'first cypress test blog')
          cy.get('.blog').eq(1).should('contain', 'second cypress test blog')
        })
      })
    })


  })
})