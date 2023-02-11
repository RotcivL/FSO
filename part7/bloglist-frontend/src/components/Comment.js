import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addComment } from '../reducers/blogReducer'

const Comment = ({ id, comments }) => {
  const [comment, setComment] = useState('')
  const dispatch = useDispatch()

  const handleComment = () => {
    dispatch(addComment(id, comment))
    setComment('')
  }

  return (
    <div>
      <h3>comments</h3>
      <div>
        <input
          type="text"
          value={comment}
          id="comment"
          onChange={({ target }) => setComment(target.value)}
        />
        <button onClick={handleComment}>add comment</button>
      </div>
      <ul>
        {comments.map((comment, index) => {
          return <li key={index}>{comment}</li>
        })}
      </ul>
    </div>
  )
}

export default Comment
