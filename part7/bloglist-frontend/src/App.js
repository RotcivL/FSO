import { useEffect, useRef } from 'react'
import Bloglist from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import { initializeBlogs } from './reducers/blogReducer'
import { useDispatch } from 'react-redux'
import { initializeUser, logout } from './reducers/userReducer'
import { useSelector } from 'react-redux'

const App = () => {
  const blogFormRef = useRef()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [])

  useEffect(() => {
    dispatch(initializeUser())
  }, [])

  const user = useSelector((state) => state.user)
  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      {user === null ? (
        <LoginForm />
      ) : (
        <div>
          <div>
            {user.name} logged in
            <button onClick={() => dispatch(logout())}>logout</button>
          </div>

          <h2>create new</h2>
          <Togglable buttonLabel="new blog" ref={blogFormRef}>
            <BlogForm />
          </Togglable>
          <Bloglist />
        </div>
      )}
    </div>
  )
}

export default App
