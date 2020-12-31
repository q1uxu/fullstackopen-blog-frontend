import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    const userString = localStorage.getItem('user')
    if (userString) {
      setUser(JSON.parse(userString))
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
      })
      .catch(error => {
        console.log(error.response.data.error)
      })
  }

  const handleLogout = (event) => {
    setUser(null)
    localStorage.removeItem('user')
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
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
      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App