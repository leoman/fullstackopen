import React, { useState } from 'react'
import blogService from '../services/blogs'

const BlogForm = ({ setBlogs, setNotificationMessage, toggleShowBlogForm }) => {

  const [title, setTitle] = useState([])
  const [author, setAuthor] = useState([])
  const [url, setUrl] = useState([])

  const handleBlogSubmit = async (event) => {
    event.preventDefault()
    try {
      const response = await blogService.create({
        title, author, url
      })
      const blogPost = response.data
      setTitle('')
      setAuthor('')
      setUrl('')
      setBlogs(blogPost)
      setNotificationMessage({
        text: `a new blog ${blogPost.title} by ${blogPost.author} added`,
        type: 'notification'
      })
      toggleShowBlogForm()
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
    } catch (exception) {
      console.log(exception)
      setNotificationMessage({
        text: 'bad!!!',
        type: 'error'
      })
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
    }
  }

  return (
    <form onSubmit={handleBlogSubmit}>
      <div>
        <label>title: </label> <input type="text" value={title} onChange={e => setTitle(e.target.value)} />
      </div>
      <div>
        <label>author: </label> <input type="text" value={author} onChange={e => setAuthor(e.target.value)} />
      </div>
      <div>
        <label>url: </label> <input type="text" value={url} onChange={e => setUrl(e.target.value)} />
      </div>
      <div>
        <button>Create</button>
        <button onClick={() => toggleShowBlogForm()}>Cancel</button>
      </div>
    </form>
  )
}

export default BlogForm