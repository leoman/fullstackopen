const user = {
  username: 'username',
  password: 'password',
  name: 'Peter Mansell'
}

const blog = {
  title: 'A new blog post',
  author: 'Peter Mansell',
  url: 'www.thebest.com'
}

describe('Blog app', () => {

  describe('Login functionality', () => {

    beforeEach(function() {
      cy.request('POST', 'http://localhost:3004/api/testing/reset')
      cy.request('POST', 'http://localhost:3004/api/users', user)
      cy.visit('http://localhost:3000')
    })

    it('Login from is shown', function() {
      cy.contains('Login')
    })

    it('user fails login with wrong credentials', function() {
      cy.contains('Login').click()
      cy.get('#username').type(user.username)
      cy.get('#password').type('fail')
      cy.get('#login-button').click()

      cy.contains('Wrong credentials')
    })

    it('user can log in', function() {
      cy.contains('Login').click()
      cy.get('#username').type(user.username)
      cy.get('#password').type('password')
      cy.get('#login-button').click()

      cy.contains(`${user.name} logged in`)
    })

  })

  describe('When logged in', () => {
    beforeEach(function() {
      cy.login(user);
    })

    it('A blog can be created', function() {
      cy.get('#new-note').click()
      cy.get('.title').type(blog.title)
      cy.get('.author').type(blog.author)
      cy.get('.url').type(blog.url)
      cy.get('#new-blog-button').click()
      cy.wait(100)
      cy.contains(`a new blog ${blog.title} by ${blog.author} added`)
    })

    it('A blog can be liked', function() {
      cy.createBlog(blog.title, blog.author, blog.url)
      cy.get('.view-button').click()
      cy.contains(`Likes 0`)
      cy.get('.like-button').click()
      cy.contains(`Likes 1`)
    })

    it('A blog can be deleted', function() {
      cy.createBlog(blog.title, blog.author, blog.url);
      cy.get('.view-button').click()
      cy.get('.delete-button').click()
    })

    it('Blogs are orderd by likes', function() {
      cy.createBlog(`${blog.title} 1`, `${blog.author} 1`, blog.url)
      cy.createBlog(`${blog.title} 2`, `${blog.author} 2`, blog.url)
      cy.createBlog(`${blog.title} 3`, `${blog.author} 3`, blog.url)
    
      cy.get('.view-button').eq(0).click()
      cy.contains(`A new blog post 3`)
      cy.contains(`Likes 0`)
     
      cy.get('.view-button').eq(1).click()
      cy.get('.like-button').eq(1).click()
      cy.get('#blogs .blog-item:first').contains('A new blog post 2')
    })
  })

})