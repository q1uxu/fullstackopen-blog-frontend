import React, { useState, useEffect } from 'react';
import usersService from '../../services/users';
import { Link } from 'react-router-dom';

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    usersService.getAll().then(allUsers => {
      setUsers(allUsers);
    });
  }, []);

  return (
    <>
      <h1>Users</h1>
      <table>
        <thead>
          <tr>
            <td>username</td>
            <td>blogs created</td>
          </tr>
        </thead>
        {users.map(user => (
          <tbody key={user.id}>
            <tr>
              <td>
                <Link to={`/users/${user.id}`}>{user.username}</Link>
              </td>
              <td>{user.blogs.length}</td>
            </tr>
          </tbody>
        ))}
      </table>
    </>
  );
};

export default Users;