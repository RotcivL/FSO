import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'
import { setNotification } from './reducers/notificationReducer'
import { useDispatch } from 'react-redux'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const blogFormRef = useRef()
  const dispatch = useDispatch()

  useEffect(() => {
    blogService.getAll().then((blogs) => {
      const orderedBlogs = blogs.sort((a, b) => b.likes - a.likes)
      setBlogs(orderedBlogs)
    })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const notify = (message, type = 'info') => {
    dispatch(setNotification({ message, type }, 3))
  }

  const handleLogin = async (loginInfo) => {
    try {
      const user = await loginService.login(loginInfo)
      window.localStorage.setItem('loggedBloglistUser', JSON.stringify(user))
      setUser(user)
      blogService.setToken(user.token)
      notify('Successfully logged in')
    } catch (exception) {
      notify('wrong username or password', 'alert')
    }
  }

  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem('loggedBloglistUser')
    blogService.setToken(null)
    notify('Logged Out')
  }

  const submitForm = async (blogObject) => {
    blogFormRef.current.toggleVisibility()
    try {
      const response = await blogService.create(blogObject)
      setBlogs(blogs.concat(response))
      notify(`a new blog ${response.title} by ${response.author} added`)
    } catch (exception) {
      notify('missing title or url', 'alert')
    }
  }

  const updateLikes = async (id, blogObject) => {
    try {
      const response = await blogService.update(id, blogObject)
      setBlogs(
        blogs
          .map((blog) => (blog.id === id ? response : blog))
          .sort((a, b) => b.likes - a.likes)
      )
      notify(`blog ${response.title} by ${response.author} likes increased`)
    } catch (exception) {
      notify(exception.response.data.error)
    }
  }

  const removeBlog = async (blog) => {
    try {
      await blogService.remove(blog.id)
      setBlogs(blogs.filter((b) => b.id !== blog.id))
      notify(`Successfully removed blog ${blog.title} by ${blog.author}`)
    } catch (exception) {
      notify(exception.response.data.error, 'alert')
    }
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      {user === null ? (
        <LoginForm login={handleLogin} />
      ) : (
        <div>
          <div>
            {user.name} logged in
            <button onClick={handleLogout}>logout</button>
          </div>

          <h2>create new</h2>
          <Togglable buttonLabel="new blog" ref={blogFormRef}>
            <BlogForm createBlog={submitForm} />
          </Togglable>
          {blogs.map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              user={user}
              updateLikes={updateLikes}
              remove={removeBlog}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default App
