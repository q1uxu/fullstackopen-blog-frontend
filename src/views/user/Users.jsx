import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UsersContext } from '../../App';

const Users = () => {
  const users = useContext(UsersContext);

  return (
    <>
      <h1>Users</h1>
      <table>
        <thead>
          <tr>
            <td>name</td>
            <td>blogs added</td>
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