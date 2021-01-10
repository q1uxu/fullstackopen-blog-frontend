import React, { useRef, useContext } from 'react';
import { useSelector } from 'react-redux';
import { useRouteMatch, Link } from 'react-router-dom';
import Toggable from '../../components/Togglable';
import BlogForm from '../blog/BlogForm';
import { UsersContext } from '../../App';

const User = () => {
  const togglableRef = useRef();
  const match = useRouteMatch('/users/:id');
  const userid = match.params.id;
  const blogs = useSelector(state => state.blogs.filter(blog => (blog.user.id || blog.user) === userid));
  const users = useContext(UsersContext);
  const user = users.find(user => user.id === userid);

  const blogStyle = {
    display: 'block',
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  if (!user) {
    return <div>no such user</div>;
  }

  if (!blogs || blogs.length === 0) {
    return (
      <div>
        <h2>{user.name}</h2>
        <div>no blogs added</div>
      </div>
    );
  }

  return (
    <div>
      <h2>{user.name}</h2>
      <Toggable buttonLabel="create note" ref={togglableRef}>
        <BlogForm togglableRef={togglableRef} />
      </Toggable>
      {blogs.sort((a, b) => b.likes - a.likes).map(blog =>
        <Link style={blogStyle} to={`/blogs/${blog.id}`} key={blog.id}>{blog.title}</Link>,
      )}
    </div>
  );
};

export default User;