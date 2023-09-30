describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.createUser({ username: 'testing', name: 'Test User', password: 'testpw' })
    cy.visit('')
  })

  it('Login form is shown', function() {
    cy.contains('Log in to application')
    cy.contains('Username:')
    cy.contains('Password:')
    cy.contains('Login')
  })

  describe('Login',function() {

    it('succeeds with correct credentials', function() {
      cy.get('#username').type('testing')
      cy.get('#password').type('testpw')
      cy.get('#login-button').click()

      cy.contains('Test User logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('testing')
      cy.get('#password').type('test')
      cy.get('#login-button').click()

      cy.contains('Invalid username or password')
      cy.get('html').should('not.contain', 'Test User logged in')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'testing', password: 'testpw' })
    })

    it('A blog can be created', function() {
      cy.contains('Create new blog').click()
      cy.get('#titleInput').type('Creating blog with cypress')
      cy.get('#authorInput').type('Test User')
      cy.get('#urlInput').type('www.test.com')
      cy.get('#createBlog').click()
      cy.contains('A new blog:')
      cy.contains('Creating blog with cypress')
      cy.wait(500)
    })

    describe('and two blogs exist', function () {
      beforeEach(function () {
        cy.createBlog({ title: 'First test blog', author: 'Test User', url: 'www.test.com' })
        cy.createBlog({ title: 'Second test blog', author: 'Test User', url: 'www.test2.com' })
      })

      it('a blog can be liked', function () {
        cy.contains('Second test blog').parent().find('button').as('viewButton')
        cy.get('@viewButton').click()
        cy.get('button:visible').contains('Like').click()
        cy.contains('Likes: 1')
      })

      it('a blog can be deleted', function () {
        cy.contains('First test blog').parent().find('button').as('viewButton')
        cy.get('@viewButton').click()
        cy.get('button:visible').contains('Remove').click()
        cy.contains('Deleted First test blog')
        cy.get('html').should('not.contain', 'www.test.com')
      })

      it('only blog creator can see remove button', function () {
        cy.createUser({ username: 'temporary', name: 'Temporary User', password: 'temp' })
        cy.login({ username: 'temporary', password: 'temp' })
        cy.contains('First test blog').parent().find('button').as('viewButton')
        cy.get('@viewButton').click()
        cy.get('button:visible').contains('Remove').should('not.exist')
        cy.contains('Second test blog').parent().find('button').as('viewButton2')
        cy.get('@viewButton2').click()
        cy.get('button:visible').contains('Remove').should('not.exist')
      })

      it('blogs should be sorted by likes', function () {
        cy.get('.blog').eq(0).should('contain', 'First test blog')
        cy.get('.blog').eq(1).should('contain', 'Second test blog')

        cy.contains('Second test blog').parent().find('button').as('viewButton')
        cy.get('@viewButton').click()
        cy.get('button:visible').contains('Like').click()

        cy.get('.blog').eq(0).should('contain', 'Second test blog')
        cy.get('.blog').eq(1).should('contain', 'First test blog')
        cy.get('button:visible').contains('Hide').click()

        cy.contains('First test blog').parent().find('button').as('viewButton2')
        cy.get('@viewButton2').click()
        cy.get('button:visible').contains('Like').click()
        cy.wait(500)
        cy.get('button:visible').contains('Like').click()

        cy.get('.blog').eq(0).should('contain', 'First test blog')
        cy.get('.blog').eq(1).should('contain', 'Second test blog')
      })
    })
  })

})