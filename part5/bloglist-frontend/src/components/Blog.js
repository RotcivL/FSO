import { useState } from 'react'

const Blog = ({ blog, user, updateLikes, remove }) => {

  const [visible, setVisible] = useState(false)

  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const buttonText = visible ? 'hide' : 'view'

  const handleLikes = () => {
    updateLikes(blog.id, {
      user: blog.user,
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1
    })
  }

  const showIfUser = {
    display: user.id === blog.user.id ? '' : 'none',
    background: 'blue',
  }

  const deleteBlog = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author} added`)) {
      remove(blog)
    }
  }

  return (
    <div style={blogStyle} className='blog'>
      <div className='blogTitleAuthor'>
        {blog.title} {blog.author}
        <button onClick={toggleVisibility}>{buttonText}</button>
      </div>
      <div style={showWhenVisible} className='blogOther'>
        <div>{blog.url}</div>
        <div>
          likes {blog.likes}
          <button onClick={handleLikes} className='likeButton'>like</button>
        </div>
        <div>{blog.user.name}</div>
        <button style={showIfUser} onClick={deleteBlog} className='removeButton'>remove</button>
      </div>

    </div>

  )

}

export default Blog