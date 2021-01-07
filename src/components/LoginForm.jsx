import React, { useState } from 'react';
import { login } from '../store/reducer/userReducer';
import { useDispatch } from 'react-redux';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const handleFormSubmit = (event) => {
    event.preventDefault();
    dispatch(login({ username, password }));
  };

  return (
    <form onSubmit={handleFormSubmit}>
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
  );
};

export default LoginForm;