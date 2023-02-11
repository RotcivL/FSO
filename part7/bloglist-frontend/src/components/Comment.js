import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addComment } from '../reducers/blogReducer'

import {
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
  TextField,
} from '@mui/material'

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
        <TextField
          label="comment"
          value={comment}
          variant="standard"
          onChange={(event) => setComment(event.target.value)}
        />
        <div>
          <Button variant="text" onClick={handleComment}>
            add comment
          </Button>
        </div>
      </div>
      <List>
        {comments.map((comment, index) => (
          <div key={index}>
            <ListItem>
              <ListItemText primary={comment} />
            </ListItem>
            <Divider />
          </div>
        ))}
      </List>
    </div>
  )
}

export default Comment
