import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'

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
        title:
        <input
          type="text"
          value={title}
          id="title"
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        author:
        <input
          type="text"
          value={author}
          id="author"
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
        url:
        <input
          type="url"
          value={url}
          id="url"
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <button type="submit">create</button>
    </form>
  )
}

export default BlogForm
