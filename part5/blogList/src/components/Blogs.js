import React from 'react'
import Blog from './Blog'

const Blogs = ({ user, handleLogout, blogs, setBlogs }) => (
  <>
    <h2>blogs</h2>
    <p>{user.name} logged in</p>
    <p><button onClick={handleLogout}>Logout</button></p>
    <div id="blogs">
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} setBlogs={setBlogs} blogs={blogs} />
      )}
    </div>
  </>
)

export default Blogs