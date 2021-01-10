import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';
import { updateBlog, deleteBlog } from '../../store/reducer/blogsReducer';

const Blog = () => {
  const dispatch = useDispatch();
  const match = useRouteMatch('/blogs/:id');
  const blogId = match.params.id;
  const blog = useSelector(state => state.blogs.find(blog => blog.id === blogId));
  const user = useSelector(state => state.user);
  if(!blog) return null;

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
    <div>
      <h2>{blog.title}</h2>
      <div>{blog.url}</div>
      <div>
        {blog.likes} likes
        <button onClick={handleLike}>like</button>
      </div>
      <div>author: {blog.author}</div>
      <div>add By {blog.user.name} </div>
      { user && blog.user.username === user.username && <button onClick={() => handleDelete(blog)}>delete</button>}
    </div>
  );
};

export default Blog;
