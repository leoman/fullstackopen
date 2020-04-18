import React, { useState, useEffect } from 'react'
import currentUser from './utils/user'
import Visible from './components/Visible'
import Notification from './components/Notification'
import Blogs from './components/Blogs'
import Login from './components/Login'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'
import './App.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showBlogForm, setShowBlogForm] = useState(false)
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [user, setUser] = useState(null)

  const handleLoginSubmit = async (event) => {
    event.preventDefault()
    try {
      const response = await loginService.login({
        username, password,
      })
      const returnedUser = response.data
      currentUser.setCurrentUser(returnedUser)
      setUser(returnedUser)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setNotificationMessage({
        text: 'Wrong credentials',
        type: 'error'
      })
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
    }
  }

  const handleSetBlogs = blog => setBlogs([...blogs, blog])
  const toggleShowBlogForm = () => setShowBlogForm(!showBlogForm)

  const handleLogout = () => {
    currentUser.removeCurrentUser()
    setUser(null)
  }

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    setUser(currentUser.getCurrentUser())
  }, [])

  const sortedBlogs = blogs.sort((a, b) => (a.likes < b.likes) ? 1 : -1)

  return (
    <div>
      <Notification message={notificationMessage} />
      <Visible visible={!user}>
        <Login
          username={username}
          password={password}
          setUsername={setUsername}
          setPassword={setPassword}
          submit={handleLoginSubmit}
        />
      </Visible>
      <Visible visible={user}>
        <Blogs
          user={!user}
          handleLogout={handleLogout}
          blogs={sortedBlogs}
          setBlogs={setBlogs}
        />
      </Visible>
      <Visible visible={showBlogForm}>
        <BlogForm
          setBlogs={handleSetBlogs}
          setNotificationMessage={setNotificationMessage}
          toggleShowBlogForm={toggleShowBlogForm}
        />
      </Visible>
      <Visible visible={!showBlogForm}>
        <button onClick={() => setShowBlogForm(true)}>New Note</button>
      </Visible>
    </div>
  )
}

export default App