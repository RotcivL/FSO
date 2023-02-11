import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'

import { TextField, Button } from '@mui/material'

const BlogForm = () => {
  const dispatch = useDispatch()
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const submitForm = (event) => {
    event.preventDefault()
    dispatch(
      createBlog({
        title: title,
        author: author,
        url: url,
      })
    )
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <form onSubmit={submitForm}>
      <div>
        <TextField
          label="title:"
          variant="standard"
          value={title}
          onChange={(event) => {
            setTitle(event.target.value)
          }}
        />
      </div>
      <div>
        <TextField
          label="author:"
          variant="standard"
          value={author}
          onChange={(event) => {
            setAuthor(event.target.value)
          }}
        />
      </div>
      <div>
        <TextField
          label="url:"
          variant="standard"
          value={url}
          onChange={(event) => {
            setUrl(event.target.value)
          }}
        />
      </div>
      <Button variant="contained" type="submit">
        create
      </Button>
    </form>
  )
}

export default BlogForm
