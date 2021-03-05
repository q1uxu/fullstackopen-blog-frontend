import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';
import Blogs from '../blog/Blogs';
import { UsersContext } from '../../App';

const User = () => {
  const match = useRouteMatch('/users/:id');
  const userid = match.params.id;
  const blogs = useSelector(state => state.blogs.filter(blog => (blog.user.id || blog.user) === userid));
  const users = useContext(UsersContext);
  const user = users.find(user => user.id === userid);

  if (!user) {
    return <div>用户不存在</div>;
  }

  if (!blogs || blogs.length === 0) {
    return (
      <div>
        <h2>{user.name}</h2>
        <div>没有博文</div>
      </div>
    );
  }

  return (
    <div>
      <h2>{user.name}</h2>
      <Blogs blogs={blogs}/>
    </div>
  );
};

export default User;