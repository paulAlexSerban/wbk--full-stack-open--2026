import { useState, useEffect,  useRef, } from 'react'
import { Routes, Route, Link, useNavigate, useMatch } from 'react-router-dom'
import Blog from './components/Blog'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [notification, setNotification] = useState({ message: null, type: '' })
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const navigate = useNavigate()
  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const match = useMatch('/blogs/:id')
  const matchedBlog = match
    ? blogs.find(blog => blog.id === match.params.id)
    : null

  const notify = (message, type = 'success') => {
    setNotification({ message, type })
    setTimeout(() => {
      setNotification({ message: null, type: '' })
    }, 5000)
  }

  const handleCreate = async (blogObject) => {
    try {
      blogFormRef.current.toggleVisibility()
      const returnedBlog = await blogService.create(blogObject)
      const fullBlogData = { ...returnedBlog, user: { username: user.username, name: user.name, id: returnedBlog.user } }

      setBlogs(blogs.concat(fullBlogData))
      notify(`a new blog "${blogObject.title}" by ${blogObject.author} added`)
      navigate('/')
    } catch (exception) {
      const errorMessage = exception.response?.data?.error || 'Failed to create blog'
      notify(errorMessage, 'error')
    }
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username,
        password
      })

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      navigate('/')
    } catch {
      notify('wrong username or password', 'error')
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
    navigate('/')
  }

  const handleLike = async (blog) => {
    if (!user) {
      notify('You must be logged in to like a blog post!', 'error')
      return
    }
    try {
      const updatedBlogPayload = {
        user: blog.user.id || blog.user,
        likes: blog.likes + 1,
        author: blog.author,
        title: blog.title,
        url: blog.url
      }
      const returnedBlog = await blogService.update(blog.id, updatedBlogPayload)
      setBlogs(blogs.map(b => b.id === blog.id ? returnedBlog : b))
    } catch {
      notify('Failed to update likes', 'error')
    }
  }

  const handleDelete = async (blog) => {
    if (window.confirm(`Remove blog "${blog.title}" by ${blog.author}?`)) {
      try {
        await blogService.remove(blog.id)
        setBlogs(blogs.filter(b => b.id !== blog.id))
        notify(`Deleted blog "${blog.title}" successfully`)
        navigate('/')
      } catch (exception) {
        const errorMessage = exception.response?.data?.error || 'Failed to delete blog'
        notify(errorMessage, 'error')
      }
    }
  }



  return (
    <div>
      <div >
        <Link to="/">blogs</Link>
        {user && <Link to="/create">create new</Link>}
        {user ? (
          <span>
            <em>{user.name} logged in</em>{' '}
            <button onClick={handleLogout}>logout</button>
          </span>
        ) : (
          <Link to="/login">login</Link>
        )}
      </div>

      <Notification message={notification.message} type={notification.type} />
      <h2>blog app</h2>

      <Routes>
        <Route path="/" element={
          <div>
            {[...blogs]
              .sort((a, b) => b.likes - a.likes)
              .map((blog) => (
                <div key={blog.id}>
                  <Link to={`/blogs/${blog.id}`}>{blog.title} by {blog.author}</Link>
                </div>
              ))}
          </div>
        } />

        <Route path="/create" element={
          user ? (
            <Togglable buttonLabel="new blog" ref={blogFormRef}>
              <BlogForm createBlog={handleCreate} />
            </Togglable>
          ) : (
            <div>Please log in to manage blog posts.</div>
          )
        } />

        <Route path="/blogs/:id" element={
          <Blog
            blog={matchedBlog}
            handleLike={() => handleLike(matchedBlog)}
            handleDelete={() => handleDelete(matchedBlog)}
            currentUser={user}
          />
        } />

        <Route path="/login" element={
          <div>
            <h2>Log in to application</h2>
            <form onSubmit={handleLogin}>
              <div>username <input type="text" value={username} onChange={({ target }) => setUsername(target.value)} /></div>
              <div>password <input type="password" value={password} onChange={({ target }) => setPassword(target.value)} /></div>
              <button type="submit">login</button>
            </form>
          </div>
        } />
      </Routes>
    </div>
  )
}

export default App