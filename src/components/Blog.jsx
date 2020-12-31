import React, { useState } from 'react'
const Blog = ({ username, blog, updateBlog, deleteBlog }) => {
  const [visible, setVisible] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleLike = event => {
    const newBlog = {
      ...blog,
      user: blog.user.id,
      likes: blog.likes + 1,
    }
    updateBlog(newBlog)
  }

  return (
    <div style={blogStyle}>
      <div>
        {blog.title}
        <button onClick={e => setVisible(!visible)}>{visible ? 'hide' : 'view'}</button>
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
  )
}

export default Blog
