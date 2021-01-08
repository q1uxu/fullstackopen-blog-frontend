import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBlogs } from './store/reducer/blogsReducer';
import { getLocalUser, logout } from './store/reducer/userReducer';
import './App.css';
import Blog from './components/Blog';
import Notification from './components/Notification';
import Toggable from './components/Togglable';
import BlogForm from './components/BlogForm';
import LoginForm from './components/LoginForm';

const App = () => {
  const togglableRef = useRef();
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const blogs = useSelector(state => state.blogs);

  useEffect(() => {
    dispatch(getLocalUser());
  }, []);

  useEffect(() => {
    dispatch(getBlogs());
  }, []);

  const handleLogout = () => {
    dispatch(logout());
  };

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification/>
        <LoginForm />
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
      <Toggable buttonLabel="create note" ref={togglableRef}>
        <BlogForm togglableRef={togglableRef}/>
      </Toggable>
      {blogs.sort((a, b) => b.likes - a.likes).map(blog =>
        <Blog key={blog.id} blog={blog} />,
      )}
    </div>
  );
};

export default App;