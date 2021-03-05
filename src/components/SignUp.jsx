import React, { useState, useRef } from 'react';
import Toggable from './Togglable';
import usersService from '../services/users';

const SignUp = () => {
  const togglableRef = useRef();
  const [username, setUsername] = useState('');
  const [fullname, setFullname] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = (event) => {
    event.preventDefault();
    usersService.createUser({ username, password, name: fullname });
    togglableRef.current.setVisible(false);
    setUsername('');
    setFullname('');
    setPassword('');
  };

  return (
    <Toggable buttonLabel="signup" ref={togglableRef}>
      <form onSubmit={handleSignUp}>
        <div>
          <label htmlFor="username">用户名</label>
          <input type="text" id="username" name="username" value={username} onChange={e => setUsername(e.target.value)} />
        </div>
        <div>
          <label htmlFor="fullname">全名</label>
          <input type="text" id="fullname" name="fullname" value={fullname} onChange={e => setFullname(e.target.value)} />
        </div>
        <div>
          <label htmlFor="password">密码</label>
          <input type="password" id="password" name="password" value={password} onChange={e => setPassword(e.target.value)} />
        </div>
        <div>
          <button>注册</button>
        </div>
      </form>
    </Toggable>
  );
};

export default SignUp;