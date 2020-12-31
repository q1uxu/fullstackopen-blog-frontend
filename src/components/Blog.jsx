import React, { useState } from 'react'
const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
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
            <button>like</button>
          </div>
          <div>{blog.author}</div>
        </>
      }
    </div>
  )
}

export default Blog
