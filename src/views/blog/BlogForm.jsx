import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createBlog } from '../../store/reducer/blogsReducer';

const BlogForm = (props) => {
  const [newBlog, setNewBlog] = useState({ title: '', author: '', url: '' });
  const dispatch = useDispatch();

  const handleFormSubmit = event => {
    event.preventDefault();
    dispatch(createBlog(newBlog));
    setNewBlog({ title: '', author: '', url: '' });
    props.togglableRef.current.setVisible(false);
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <h2>create new</h2>
      <div>
        <label htmlFor="title">标题</label>
        <input type="text" id="title" name="title" value={newBlog.title} onChange={e => setNewBlog({ ...newBlog, title: e.target.value })} />
      </div>
      <div>
        <label htmlFor="author">作者</label>
        <input type="text" id="author" name="author" value={newBlog.author} onChange={e => setNewBlog({ ...newBlog, author: e.target.value })} />
      </div>
      <div>
        <label htmlFor="url">文章原址</label>
        <input type="text" id="url" name="url" value={newBlog.url} onChange={e => setNewBlog({ ...newBlog, url: e.target.value })} />
      </div>
      <button type="submit">添加</button>
    </form>
  );
};

export default BlogForm;