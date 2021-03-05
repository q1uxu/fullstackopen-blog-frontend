import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UsersContext } from '../../App';

const Users = () => {
  const users = useContext(UsersContext);

  return (
    <>
      <h1>用户</h1>
      <table>
        <thead>
          <tr>
            <td>用户名</td>
            <td>博文数</td>
          </tr>
        </thead>
        {users.map(user => (
          <tbody key={user.id}>
            <tr>
              <td>
                <Link to={`/users/${user.id}`}>{user.name}</Link>
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