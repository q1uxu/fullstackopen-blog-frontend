import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { notify } from './store/reducer/notificationReducer';
import './App.css';
import Blog from './components/Blog';
import Notification from './components/Notification';
import blogService from './services/blogs';
import loginService from './services/login';
import Toggable from './components/Togglable';
import BlogForm from './components/BlogForm';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const blogFormRef = useRef();

  const dispatch = useDispatch();

  useEffect(() => {
    const userString = localStorage.getItem('user');
    if (userString) {
      const user = JSON.parse(userString);
      setUser(user);
      blogService.setToken(user.token);
      dispatch(notify({
        message: `welcome back, ${user.name}`,
        duration: 5000,
      }));
    }
  }, []);

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs),
    );
  }, []);

  const handleLogin = (event) => {
    event.preventDefault();
    loginService.login({ username, password })
      .then(user => {
        setUser(user);
        localStorage.setItem('user', JSON.stringify(user));
        blogService.setToken(user.token);
      })
      .catch(error => {
        console.log(error.response.data);
        dispatch(notify({
          message: error.response.data,
          type: 'error',
        }));
      });
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
    blogService.setToken(null);
  };

  const createBlog = (newBlog) => {
    blogFormRef.current.setVisible(false);
    blogService.createBlog(newBlog)
      .then(savedBlog => {
        setBlogs(blogs.concat(savedBlog));
        dispatch(notify({
          message: `a new blog ${savedBlog.title} by ${savedBlog.author} added!`,
        }));
      })
      .catch(error => {
        console.log(error.response.data);
        dispatch(notify({
          message: error.response.data,
          type: 'error',
        }));
      });
  };

  const updateBlog = (newBlog) => {
    blogService.updateBlog(newBlog)
      .then(savedBlog => {
        setBlogs(blogs.map(blog => blog.id === newBlog.id ? savedBlog : blog));
      })
      .catch(error => {
        console.log(error);
        dispatch(notify({
          message: error.response.data,
          type: 'error',
        }));
      });
  };

  const deleteBlog = (toDeleteBlog) => {
    const confirm = window.confirm(`Delete blog [${toDeleteBlog.title}] by ${toDeleteBlog.author}?`);
    if (!confirm) return;
    blogService.deleteBlog(toDeleteBlog.id)
      .then(() => {
        const newBlogs = blogs.slice();
        const index = blogs.findIndex(blog => blog.id === toDeleteBlog.id);
        newBlogs.splice(index, 1);
        setBlogs(newBlogs);
        dispatch(notify({
          message: `Delete blog ${toDeleteBlog.title} by ${toDeleteBlog.author}`,
        }));
      })
      .catch(error => {
        console.log(error.response.data);
        dispatch(notify({
          message: error.response.data,
          type: 'error',
        }));
      });
  };

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification/>
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
    );
  }

  return (
    <div>
      <h2>blogs</h2>
      <div>
        hello, {user.name}
        <button onClick={handleLogout}>log out</button>
      </div>
      <Notification/>
      <Toggable buttonLabel="create note" ref={blogFormRef}>
        <BlogForm createBlog={createBlog} />
      </Toggable>
      {blogs.sort((a, b) => b.likes - a.likes).map(blog =>
        <Blog key={blog.id} username={username} blog={blog} updateBlog={updateBlog} deleteBlog={deleteBlog} />,
      )}
    </div>
  );
};

export default App;