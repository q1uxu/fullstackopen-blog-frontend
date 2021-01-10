import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';
import Toggable from '../../components/Togglable';
import BlogForm from '../blog/BlogForm';
import Blog from '../blog/Blog.jsx';

const User = () => {
  const togglableRef = useRef();
  const match = useRouteMatch('/users/:id');
  const userid = match.params.id;
  const blogs = useSelector(state => state.blogs.filter(blog => (blog.user.id || blog.user) === userid));

  if (!blogs || blogs.length === 0) {
    return <div>no blogs</div>;
  }

  return (
    <div>
      <Toggable buttonLabel="create note" ref={togglableRef}>
        <BlogForm togglableRef={togglableRef}/>
      </Toggable>
      {blogs.sort((a, b) => b.likes - a.likes).map(blog =>
        <Blog key={blog.id} blog={blog} />,
      )}
    </div>
  );
};

export default User;