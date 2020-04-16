const supertest = require('supertest')
const Blog = require('../../models/blog')
const User = require('../../models/user')

const app = require('../../app')
const api = supertest(app)

const initialBlogs = [
  {
    title: 'My first blog',
    author: 'Peter',
    url: 'www.thebestblog.com',
    likes: 1
  },
  {
    title: 'My second blog',
    author: 'Peter',
    url: 'www.thebestblog.com',
    likes: 2
  },
]

const blogsInDb = async () => {
  const posts = await Blog.find({})
  return posts.map(post => post.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

const saveNewUser = async (username, password, name = 'root') => {
  const response = await api
    .post('/api/users')
    .send({ username, password, name })
    .expect(200)
  return response.body
}

const getAuthToken = async (username, password) => {
  const response = await api
    .post('/api/login')
    .send({ username, password })
    .expect(200)
  return response.body.token
}

module.exports = {
  initialBlogs,
  saveNewUser,
  getAuthToken,
  blogsInDb,
  usersInDb
}