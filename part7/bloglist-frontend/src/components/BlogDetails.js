import { useDispatch, useSelector } from 'react-redux'
import { incrementLike, deleteBlog } from '../reducers/blogReducer'
import Comment from './Comment'
const BlogDetails = ({ blog }) => {
  if (!blog) {
    return null
  }
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user.user)
  const own = user.username === blog.user.username

  const remove = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author} added`)) {
      dispatch(deleteBlog(blog))
    }
  }

  return (
    <div>
      <div>
        <a href={blog.url}>{blog.url}</a>
      </div>
      <div>
        {blog.likes} likes
        <button onClick={() => dispatch(incrementLike(blog))}>like</button>
      </div>
      added by {blog.user.name}
      {own && <button onClick={remove}>remove</button>}
      <Comment comments={blog.comments} />
    </div>
  )
}

export default BlogDetails
