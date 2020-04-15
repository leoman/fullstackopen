const Blog = require('../../models/blog')

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

module.exports = {
  initialBlogs,
  blogsInDb,
}