const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('../utils/test_helper')
const app = require('../../app')
const api = supertest(app)

const Blog = require('../../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObjects = helper.initialBlogs
    .map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})

describe('fetching of blogs', () => {

  test('posts are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all posts are returned', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test('a specific post is within the returned blogs', async () => {
    const response = await api.get('/api/blogs')

    const titles = response.body.map(r => r.title)
    expect(titles).toContain(
      'My first blog'
    )
  })

  test('a unique identifer id is attached to each post', async () => {
    const response = await api.get('/api/blogs')
    const contents = response.body.map(r => r)
    const [firstPost] = contents
    expect(firstPost.id).toBeDefined()
  })

})

describe('saving a blog', () => {

  test('a valid post can be added', async () => {
    const newPost = {
      title: 'My third blog',
      author: 'Peter',
      url: 'www.thebestblog.com',
      likes: 3
    }

    await api
      .post('/api/blogs')
      .send(newPost)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const postsAtEnd = await helper.blogsInDb()
    expect(postsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    const titles = postsAtEnd.map(n => n.title)
    expect(titles).toContain(
      'My third blog'
    )
  })

  test('if the likes prop is missed out, it defaults to 0', async () => {
    const newPost = {
      title: 'My fourth blog',
      author: 'Peter',
      url: 'www.thebestblog.com',
    }

    const response = await api
      .post('/api/blogs')
      .send(newPost)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    expect(response.body.likes).toBe(0)
  })

  test('throw a 400 error if title and url are missing', async () => {
    const newBlog = {
      author: 'Peter',
      likes: 2,
    }

    await api.post('/api/blogs').send(newBlog).expect(400)
  })

})

describe('deletion of a blog', () => {

  test('deleted blog is removed from database', async () => {
    const newBlog = {
      author: 'Peter',
      title: 'A blog never seen',
      likes: 2,
      url: 'www.thebestblog.com',
    }

    const response = await api.post('/api/blogs').send(newBlog)
    const blogsBeforeDeletion = await api.get('/api/blogs')
    await api.delete(`/api/blogs/${response.body.id}`).expect(204)
    const blogsAfterDeletion = await api.get('/api/blogs')
    expect(blogsBeforeDeletion.body.length).toBe(
      blogsAfterDeletion.body.length + 1
    )
  })

})

describe('updating of a blog', () => {
  test('updated post is saved to the database', async () => {
    const updatedBlog = { title: 'An updated post', likes: 2 }
    const blogsBeforeUpdate = await api.get('/api/blogs')
    const [firstBlog] = blogsBeforeUpdate.body
    await api.put(`/api/blogs/${firstBlog.id}`).send(updatedBlog).expect(204)
    const blogsAfterUpdate = await api.get('/api/blogs')
    const response = blogsAfterUpdate.body.filter(
      blog => blog.id === firstBlog.id
    )
    const [firstUpdatedBlog] = response
    expect(firstUpdatedBlog.title).toBe(updatedBlog.title)
    expect(firstUpdatedBlog.likes).toBe(updatedBlog.likes)
  })
})

afterAll(() => {
  mongoose.connection.close()
})