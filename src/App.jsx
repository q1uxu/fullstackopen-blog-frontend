import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './components/Login';
import Users from './views/user/Users';

const App = () => {

  return (
    <>
      <h1>blogs</h1>
      <Login />
      <Switch>
        <Route path="/users" exact>
          <Users />
        </Route>
      </Switch>
    </>
  );
};

export default App;