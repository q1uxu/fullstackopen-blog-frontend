import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getLocalUser, login, logout } from '../store/reducer/userReducer';
import Toggable from './Togglable';

const Login = () => {
  const dispatch = useDispatch();
  const togglableRef = useRef();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const user = useSelector(state => state.user);

  useEffect(() => {
    dispatch(getLocalUser());
    setIsLoading(false);
  }, []);

  const handleLogin = (event) => {
    event.preventDefault();
    dispatch(login({ username, password }));
    togglableRef.current.setVisible(false);
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  if (isLoading) {
    return null;
  }

  if (user === null) {
    return (
      <div>
        <h2>welcome, please login</h2>
        <Toggable buttonLabel="login" ref={togglableRef}>
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
        </Toggable>
      </div>
    );
  }

  return (
    <div>
      hello, {user.name}
      <button onClick={handleLogout}>log out</button>
    </div>
  );
};

export default Login;