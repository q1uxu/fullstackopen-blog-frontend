import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateBlog } from '../store/reducer/blogsReducer';

const Blog = ({ username, blog, deleteBlog }) => {
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  const handleLike = () => {
    const blogToUpdate = {
      ...blog,
      user: blog.user.id,
      likes: blog.likes + 1,
    };
    dispatch(updateBlog(blogToUpdate));
  };

  return (
    <div style={blogStyle}>
      <div>
        {blog.title}
        <button onClick={() => setVisible(!visible)}>{visible ? 'hide' : 'view'}</button>
      </div>
      { visible &&
        <>
          <div>{blog.url}</div>
          <div>
            {blog.likes}
            <button onClick={handleLike}>like</button>
          </div>
          <div>{blog.author}</div>
          { blog.user.username === username && <button onClick={() => deleteBlog(blog)}>delete</button>}
        </>
      }
    </div>
  );
};

export default Blog;
