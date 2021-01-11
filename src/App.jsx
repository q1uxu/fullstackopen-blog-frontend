import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Switch, Route } from 'react-router-dom';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Toggable from './components/Togglable';
import BlogForm from './views/blog/BlogForm';
import Notification from './components/Notification';
import Users from './views/user/Users';
import User from './views/user/User';
import Blogs from './views/blog/Blogs';
import Blog from './views/blog/Blog';
import { getBlogs } from './store/reducer/blogsReducer';
import usersService from './services/users';
import './App.css';

export const UsersContext = React.createContext([]);

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBlogs());
  }, []);

  const [users, setUsers] = useState([]);
  useEffect(() => {
    usersService.getAll().then(allUsers => {
      setUsers(allUsers);
    });
  }, []);

  const blogs = useSelector(state => state.blogs);
  const user = useSelector(state => state.user);

  const togglableRef = useRef();

  return (
    <div className="container">
      <Link to="/blogs" className="menu-link">blogs</Link>
      <Link to="/users" className="menu-link">users</Link>
      <h1>blogs app</h1>
      <Login />
      {!user && <SignUp />}
      <Notification />
      {user && <Toggable buttonLabel="create note" ref={togglableRef}>
        <BlogForm togglableRef={togglableRef} />
      </Toggable>}
      <UsersContext.Provider value={users}>
        <Switch>
          <Route path="/users" exact>
            <Users />
          </Route>
          <Route path="/users/:id" exact>
            <User />
          </Route>
          <Route path="/blogs" exact>
            <Blogs blogs={blogs}/>
          </Route>
          <Route path="/blogs/:id" exact>
            <Blog />
          </Route>
        </Switch>
      </UsersContext.Provider>
    </div>
  );
};

export default App;