const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const middleware = require('../utils/middleware')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  return response.json(blogs)
})

blogsRouter.post('/', middleware.tokenVerify, async (request, response) => {

  if (!request.body.title || !request.body.url) {
    return response.status(400).end()
  }

  const user = await User.findById(request.user.id)

  const blog = new Blog({
    ...request.body,
    user: user._id
  })
  const result = await blog.save()

  user.blogs = user.blogs.concat(result._id)
  await user.save()
  return response.status(201).json(result)
})

blogsRouter.put('/:id', async (request, response) => {
  const title = request.body.title
  const author = request.body.author
  const url = request.body.url
  const likes = request.body.likes

  const blog = {
    title,
    author,
    url,
    likes,
  }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  response.status(204).json(updatedBlog.toJSON())
})

blogsRouter.delete('/:id', middleware.tokenVerify, async (request, response) => {

  const user = await User.findById(request.user.id)
  const blog = await Blog.findById(request.params.id)
  if(blog.user.toString() === user.id.toString()) {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } else {
    response.status(400).json({ error: 'user cannot delete that blog' })
  }
})

module.exports = blogsRouter