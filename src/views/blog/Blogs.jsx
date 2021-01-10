import React from 'react';
import { Link } from 'react-router-dom';

const Blogs = ({ blogs }) => {

  const blogStyle = {
    display: 'block',
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  return (
    <div>
      {blogs.sort((a, b) => b.likes - a.likes).map(blog =>
        <Link style={blogStyle} to={`/blogs/${blog.id}`} key={blog.id}>{blog.title}</Link>,
      )}
    </div>
  );
};

export default Blogs;