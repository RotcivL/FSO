import { useState } from "react"

const Blog = ({blog}) => {

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

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}
        <button onClick={toggleVisibility}>{buttonText}</button>
      </div> 
      <div style={showWhenVisible}>{blog.url}</div>
      <div style={showWhenVisible}>
        likes {blog.likes}
        <button>like</button>
      </div>
      <div style={showWhenVisible}>{blog.user.name}</div>
    </div>

  )
 
}

export default Blog