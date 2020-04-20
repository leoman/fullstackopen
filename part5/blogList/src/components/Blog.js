import React, { useState } from 'react'
import PropTypes from 'prop-types'
import currentUser from '../utils/user'
import blogService from '../services/blogs'
import Visable from './Visible'

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: 'solid',
  borderWidth: 1,
  marginBottom: 5
}

const Blog = ({ blog, blogs, setBlogs }) => {

  const user = currentUser.getCurrentUser()

  const [showBlog, setShowBlog] = useState(false)

  const toggleShowBlog = () => setShowBlog(!showBlog)

  const setNewLike = () => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1
    }

    blogService.update(blog.id, {
      ...updatedBlog,
      user: blog.user.id,
    })

    setBlogs([...blogs.filter(b => b.id !== blog.id), updatedBlog])
  }

  const deleteBlog = async () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      await blogService.remove(blog.id)
      setBlogs(blogs.filter(b => b.id !== blog.id))
    }
  }

  const isPostByUser = () => blog.user.username === user.username

  return (
    <div className="blog-item" style={blogStyle}>
      <p className="title">{blog.title} <button className="view-button" onClick={toggleShowBlog}>{!showBlog ? 'View' : 'Hide'}</button></p>
      <Visable visible={showBlog}>
        <p className="url">{blog.url}</p>
        <p className="likes">Likes {blog.likes} <button className="like-button" onClick={setNewLike}>Like</button></p>
        <p className="author">{blog.author}</p>
        <Visable visible={isPostByUser}>
          <button className="delete-button" onClick={deleteBlog}>Delete</button>
        </Visable>
      </Visable>
    </div>
  )

}

Blog.propTypes = {
  blog: PropTypes.object,
  blogs: PropTypes.array,
  setBlogs: PropTypes.func.isRequired
}

export default Blog