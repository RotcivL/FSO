import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { incrementLike, deleteBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

const BlogDetails = ({ blog, visible, likeBlog, removeBlog, own }) => {
  if (!visible) return null

  const addedBy = blog.user && blog.user.name ? blog.user.name : 'anonymous'

  return (
    <div>
      <div>
        <a href={blog.url}>{blog.url}</a>
      </div>
      <div>
        {blog.likes} likes <button onClick={likeBlog}>like</button>
      </div>
      {addedBy}
      {own && <button onClick={removeBlog}>remove</button>}
    </div>
  )
}

const Blog = ({ blog, user }) => {
  const dispatch = useDispatch()
  const [visible, setVisible] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const likeBlog = () => {
    dispatch(incrementLike(blog))
    dispatch(
      setNotification(
        { message: `blog ${blog.title} by ${blog.author} likes increased` },
        3
      )
    )
  }

  const removeBlog = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author} added`)) {
      dispatch(deleteBlog(blog))
      dispatch(
        setNotification(
          {
            message: `Successfully removed blog ${blog.title} by ${blog.author}`,
          },
          3
        )
      )
    }
  }

  return (
    <div style={blogStyle} className="blog">
      {blog.title} {blog.author}
      <button onClick={() => setVisible(!visible)}>
        {visible ? 'hide' : 'view'}
      </button>
      <BlogDetails
        blog={blog}
        visible={visible}
        likeBlog={likeBlog}
        removeBlog={removeBlog}
        own={blog.user && user.username === blog.user.username}
      />
    </div>
  )
}

const Bloglist = ({ user }) => {
  const byLIkes = (a1, a2) => (a2.likes > a1.likes ? 1 : -1)
  const blogs = useSelector((state) => [...state.blog].sort(byLIkes))

  return (
    <div>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} user={user} />
      ))}
    </div>
  )
}

export default Bloglist
