import { useState } from 'react'

const Blog = ({ blog, handleLike, handleDelete, currentUser }) => {
  const [visible, setVisible] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const showDeleteButton = currentUser && blog.user && currentUser.username === blog.user.username

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}
        <button onClick={() => setVisible(!visible)}>
          {visible ? 'hide' : 'view'}
        </button>
      </div>
      {visible && (
        <div>
          <div>{blog.url}</div>
          <div>
            likes {blog.likes} <button onClick={handleLike}>like</button>
          </div>
          <div>{blog.user?.name || blog.user?.username}</div>

          {showDeleteButton && (
            <button
              onClick={handleDelete}
              style={{ backgroundColor: 'red', color: 'white', borderRadius: '4px', cursor: 'pointer' }}
            >
              remove
            </button>
          )}
        </div>
      )}
    </div>
  )
}

export default Blog
