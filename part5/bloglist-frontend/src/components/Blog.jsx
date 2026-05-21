const Blog = ({ blog, handleLike, handleDelete, currentUser }) => {
  if (!blog) {
    return <p>Loading blog post data...</p>
  }

  const showDeleteButton = currentUser && blog.user && currentUser.username === blog.user.username

  return (
    <div className="blog__view">
      <h2>{blog.title}</h2>

      <div className="blog__details">
        <div>
          <a href={blog.url} target="_blank" rel="noopener noreferrer">
            {blog.url}
          </a>
        </div>

        <div>
          <strong>likes {blog.likes}</strong>{' '}
          {currentUser && (
            <button onClick={handleLike}>like</button>
          )}
        </div>

        <div>
          added by {blog.user?.name || blog.user?.username || 'unknown user'}
        </div>

        {showDeleteButton && (
          <div>
            <button
              onClick={handleDelete}
            >
              remove
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Blog
