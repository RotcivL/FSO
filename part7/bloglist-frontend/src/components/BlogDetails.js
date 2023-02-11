import { useDispatch, useSelector } from 'react-redux'
import { incrementLike, deleteBlog } from '../reducers/blogReducer'
import Comment from './Comment'

import { Button } from '@mui/material'
const BlogDetails = ({ blog }) => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user.user)

  if (!blog) {
    return null
  }
  const own = user.username === blog.user.username

  const remove = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author} added`)) {
      dispatch(deleteBlog(blog))
    }
  }

  return (
    <div>
      <h2>
        {blog.title} {blog.author}
      </h2>
      <div>
        <a href={blog.url}>{blog.url}</a>
      </div>
      <div>
        {blog.likes} likes
        <Button variant="text" onClick={() => dispatch(incrementLike(blog))}>
          like
        </Button>
      </div>
      added by {blog.user.name}
      {own && <button onClick={remove}>remove</button>}
      <Comment id={blog.id} comments={blog.comments} />
    </div>
  )
}

export default BlogDetails
