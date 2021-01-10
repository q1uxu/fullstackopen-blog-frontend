import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import Login from './components/Login';
import Notification from './components/Notification';
import Users from './views/user/Users';
import User from './views/user/User';
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

  return (
    <>
      <h1>blogs app</h1>
      <Login />
      <Notification />
      <UsersContext.Provider value={users}>
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
      </UsersContext.Provider>
    </>
  );
};

export default App;