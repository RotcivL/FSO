import { useState } from "react"

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const submitForm = (event) => {
    event.preventDefauult()
    createBlog({
      title: title,
      author: author,
      url:url,
    })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
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
  )
}

export default BlogForm