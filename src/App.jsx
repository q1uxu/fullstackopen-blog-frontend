import React, { useState, useEffect } from 'react'
import './App.css'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [newBlog, setNewBlog] = useState({ title: '', author: '', url: '' })
  const [message, setMessage] = useState(null)
  const [messageType, setMessageType] = useState(null)

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

  const handleCreateBlog = (event) => {
    event.preventDefault();
    blogService.createBlog(newBlog)
      .then(savedBlog => {
        setNewBlog({ title: '', author: '', url: '' })
        setBlogs(blogs.concat(savedBlog))
        notice.success(`a new blog ${savedBlog.title} by ${savedBlog.author} added!`)
      })
      .catch(error => {
        console.log(error.response.data)
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
      <div>
        hello, {user.name}
        <button onClick={handleLogout}>log out</button>
      </div>
      <Notification message={message} messageType={messageType} />
      <form onSubmit={handleCreateBlog}>
        <div>
          <label htmlFor="title">title</label>
          <input type="text" id="title" name="title" value={newBlog.title} onChange={e => setNewBlog({ ...newBlog, title: e.target.value })} />
        </div>
        <div>
          <label htmlFor="author">author</label>
          <input type="text" id="author" name="author" value={newBlog.author} onChange={e => setNewBlog({ ...newBlog, author: e.target.value })} />
        </div>
        <div>
          <label htmlFor="url">url</label>
          <input type="text" id="url" name="url" value={newBlog.url} onChange={e => setNewBlog({ ...newBlog, url: e.target.value })} />
        </div>
        <button type="submit">create</button>
      </form>
      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App