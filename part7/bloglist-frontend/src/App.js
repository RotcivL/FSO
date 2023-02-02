import { useState, useEffect, useRef } from 'react'
import Bloglist from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'
import { setNotification } from './reducers/notificationReducer'
import { initializeBlogs } from './reducers/blogReducer'
import { useDispatch } from 'react-redux'

const App = () => {
  const [user, setUser] = useState(null)
  const blogFormRef = useRef()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
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
            <BlogForm />
          </Togglable>
          <Bloglist user={user} />
        </div>
      )}
    </div>
  )
}

export default App
