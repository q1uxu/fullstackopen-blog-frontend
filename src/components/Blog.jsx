import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateBlog, deleteBlog } from '../store/reducer/blogsReducer';

const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();
  const username = useSelector(state => state.user.username);

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

  const handleDelete = (blogToDelete) => {
    const confirm = window.confirm(`Delete blog [${blogToDelete.title}] by ${blogToDelete.author}?`);
    if (!confirm) return;
    dispatch(deleteBlog(blogToDelete));
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
          { blog.user.username === username && <button onClick={() => handleDelete(blog)}>delete</button>}
        </>
      }
    </div>
  );
};

export default Blog;
