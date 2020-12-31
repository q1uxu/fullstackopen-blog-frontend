import React, { useState, useEffect, useRef } from 'react'
import './App.css'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import Toggable from './components/Togglable'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const [messageType, setMessageType] = useState(null)
  const blogFormRef = useRef()

  const notice = {
    error: (message, duration = 5000) => {
      setMessage(JSON.stringify(message))
      setMessageType('error')
      setTimeout(() => {
        setMessage(null)
        setMessageType(null)
      }, duration)
    },
    success: (message, duration = 5000) => {
      setMessage(JSON.stringify(message))
      setMessageType('success')
      setTimeout(() => {
        setMessage(null)
        setMessageType(null)
      }, duration)
    },
  }

  useEffect(() => {
    const userString = localStorage.getItem('user')
    if (userString) {
      const user = JSON.parse(userString)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  const handleLogin = (event) => {
    event.preventDefault();
    loginService.login({ username, password })
      .then(user => {
        setUser(user)
        localStorage.setItem('user', JSON.stringify(user))
        blogService.setToken(user.token)
      })
      .catch(error => {
        console.log(error.response.data)
        notice.error(error.response.data)
      })
  }

  const handleLogout = (event) => {
    setUser(null)
    localStorage.removeItem('user')
    blogService.setToken(null)
  }

  const createBlog = (newBlog) => {
    blogFormRef.current.setVisible(false)
    blogService.createBlog(newBlog)
      .then(savedBlog => {
        setBlogs(blogs.concat(savedBlog))
        notice.success(`a new blog ${savedBlog.title} by ${savedBlog.author} added!`)
      })
      .catch(error => {
        console.log(error.response.data)
        notice.error(error.response.data)
      })
  }

  const updateBlog = (newBlog) => {
    blogService.updateBlog(newBlog)
      .then(savedBlog => {
        setBlogs(blogs.map(blog => blog.id === newBlog.id ? savedBlog : blog))
      })
      .catch(error => {
        console.log(error)
        notice.error(error.response.data)
      })
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification message={message} messageType={messageType} />
        <form onSubmit={handleLogin}>
          <div>
            <label htmlFor="username">username</label>
            <input type="text" id="username" name="username" value={username} onChange={e => setUsername(e.target.value)} />
          </div>
          <div>
            <label htmlFor="password">password</label>
            <input type="password" id="password" name="password" value={password} onChange={e => setPassword(e.target.value)} />
          </div>
          <div>
            <button>login</button>
          </div>
        </form>
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <div>
        hello, {user.name}
        <button onClick={handleLogout}>log out</button>
      </div>
      <Notification message={message} messageType={messageType} />
      <Toggable buttonLabel="create note" ref={blogFormRef}>
        <BlogForm createBlog={createBlog} />
      </Toggable>
      {blogs.sort((a, b) => b.likes - a.likes).map(blog =>
        <Blog key={blog.id} blog={blog} updateBlog={updateBlog} />
      )}
    </div>
  )
}

export default App