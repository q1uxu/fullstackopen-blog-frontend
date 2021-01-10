import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import Login from './components/Login';
import Notification from './components/Notification';
import Users from './views/user/Users';
import User from './views/user/User';
import Blog from './views/blog/Blog';
import { getBlogs } from './store/reducer/blogsReducer';
import './App.css';

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBlogs());
  }, []);

  return (
    <>
      <h1>blogs</h1>
      <Login />
      <Notification/>
      <Switch>
        <Route path="/users" exact>
          <Users />
        </Route>
        <Route path="/users/:id" exact>
          <User />
        </Route>
        <Route path="/blogs/:id" exact>
          <Blog />
        </Route>
      </Switch>
    </>
  );
};

export default App;