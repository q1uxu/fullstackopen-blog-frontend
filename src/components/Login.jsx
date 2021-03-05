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
        <h2>欢迎~请登录</h2>
        <Toggable buttonLabel="登录" ref={togglableRef}>
          <form onSubmit={handleLogin}>
            <div>
              <label htmlFor="username">用户名</label>
              <input type="text" id="username" name="username" value={username} onChange={e => setUsername(e.target.value)} />
            </div>
            <div>
              <label htmlFor="password">密码</label>
              <input type="password" id="password" name="password" value={password} onChange={e => setPassword(e.target.value)} />
            </div>
            <div>
              <button>登录</button>
            </div>
          </form>
        </Toggable>
      </div>
    );
  }

  return (
    <div>
      哈喽~ {user.name}
      <button onClick={handleLogout}>注销</button>
    </div>
  );
};

export default Login;