import { useRef, useEffect } from 'react'

import BlogDetails from './components/BlogDetails'
import Blogs from './components/Blogs'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import Users from './components/Users'
import User from './components/User'

import { useDispatch, useSelector } from 'react-redux'
import { initializeUsers, logout } from './reducers/userReducer'
import { initializeBlogs } from './reducers/blogReducer'

import { Route, Routes, Link, useMatch, Navigate } from 'react-router-dom'

const App = () => {
  const dispatch = useDispatch()
  const blogFormRef = useRef()

  useEffect(() => {
    dispatch(initializeUsers())
  }, [])

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [])

  const { user, users } = useSelector((state) => state.user)
  const blogs = useSelector((state) => state.blog)

  const userMatch = useMatch('/users/:id')
  const selectedUser = userMatch
    ? users.find((user) => user.id === userMatch.params.id)
    : null

  const blogMatch = useMatch('/blogs/:id')

  const blog = blogMatch
    ? blogs.find((blog) => blog.id === blogMatch.params.id)
    : null

  return (
    <div>
      <div>
        <Link to="/">blogs</Link>
        <Link to="/users">users</Link>
        {user ? (
          <>
            <em>{user.name} logged in</em>
            <button onClick={() => dispatch(logout())}>logout</button>
          </>
        ) : (
          <Link to="/login">login</Link>
        )}
      </div>
      <h2>blog app</h2>
      <Notification />
      <Routes>
        <Route
          path="/"
          element={
            user ? (
              <>
                <h2>create new</h2>
                <Togglable buttonLabel="new blog" ref={blogFormRef}>
                  <BlogForm />
                </Togglable>
                <Blogs />
              </>
            ) : (
              <Navigate replace to="/login" />
            )
          }
        />

        <Route
          path="/login"
          element={user ? <Navigate replace to="/" /> : <LoginForm />}
        />
        <Route path="/users" element={<Users />} />
        <Route path="/users/:id" element={<User user={selectedUser} />} />
        <Route path="/blogs/:id" element={<BlogDetails blog={blog} />} />
      </Routes>
    </div>
  )
}

export default App
