import React, { useState } from 'react'

const BlogForm = ({ handleBlogSubmit, toggleShowBlogForm }) => {

  const [title, setTitle] = useState([])
  const [author, setAuthor] = useState([])
  const [url, setUrl] = useState([])

  const handleSubmit = async (event) => {
    event.preventDefault()
   
    handleBlogSubmit({
      title, author, url
    })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>title: </label> <input className="title" type="text" value={title} onChange={e => setTitle(e.target.value)} />
      </div>
      <div>
        <label>author: </label> <input className="author" type="text" value={author} onChange={e => setAuthor(e.target.value)} />
      </div>
      <div>
        <label>url: </label> <input className="url" type="text" value={url} onChange={e => setUrl(e.target.value)} />
      </div>
      <div>
        <button id="new-blog-button">Create</button>
        <button onClick={() => toggleShowBlogForm()}>Cancel</button>
      </div>
    </form>
  )
}

export default BlogForm