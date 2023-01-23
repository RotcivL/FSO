import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const [notification, setNotification] = useState(null)

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const notify = ( message, type='info' ) => {
    console.log(message);
    setNotification({ message, type })
    setTimeout(() => {
      setNotification(null)
    }, 3000)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })
      window.localStorage.setItem('loggedBloglistUser', JSON.stringify(user))
      setUser(user)
      blogService.setToken(user.token)
      notify("Successfully logged in")
      setUsername('')
      setPassword('')
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

  const submitForm = async (event) => {
    blogFormRef.current.toggleVisibility()
    event.preventDefault()
    try {
      const blogObject = {
        title: title,
        author: author,
        url: url,
      }
      
      const response = await blogService.create(blogObject)
      setBlogs(blogs.concat(response))
      notify(`a new blog ${response.title} by ${response.author} added`)
      setTitle('')
      setAuthor('')
      setUrl('')
    } catch (exception) {
      notify(`missing title or url`, 'alert')
    }
  }

  const loginForm = () => {
    return (
      <form onSubmit={handleLogin}>
        <div>
          username
            <input
            type='text'
            value={username}
            name='Username'
            onChange={({ target }) => setUsername(target.value)}
            />
        </div>
        <div>
          password
            <input
            type='password'
            value={password}
            name='Password'
            onChange={({ target }) => setPassword(target.value)}
            />
        </div>
        <button type="submit">login</button>
      </form>
    )
  }

  const displayBlogs = () => {
    return (
      <div>
        <div>
          {user.name} logged in
          <button onClick={handleLogout}>logout</button>
        </div>
        
        <h2>create new</h2>
        {blogsForm()}
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
    )
  }

  const blogsForm = () => {
    return  (
      <Togglable buttonLabel='new note' ref={blogFormRef}>
        <form onSubmit={submitForm}>
          <div>
            title:
              <input
              type='text'
              value={title}
              name='Title'
              onChange={({ target }) => setTitle(target.value)}
              />
          </div>
          <div>
            author:
              <input
              type='text'
              value={author}
              name='Author'
              onChange={({ target }) => setAuthor(target.value)}
              />
          </div>
          <div>
            url:
            <input
            type='url'
            value={url}
            name='Url'
            onChange={({ target}) => setUrl(target.value)}
            />
          </div>
          <button type="submit">create</button>
        </form>
      </Togglable>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification notification={notification} />
      {user === null ?
        loginForm() :
        displayBlogs() 
      }

    </div>
  )
}

export default App
