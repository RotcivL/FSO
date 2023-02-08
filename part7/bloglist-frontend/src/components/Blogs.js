import { useSelector } from 'react-redux'

import { Link } from 'react-router-dom'

const Blogs = () => {
  const byLIkes = (a1, a2) => (a2.likes > a1.likes ? 1 : -1)
  const blogs = useSelector((state) => [...state.blog].sort(byLIkes))

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  return (
    <div>
      {blogs.map((blog) => (
        <div style={blogStyle} className="blog" key={blog.id}>
          <Link to={`/blogs/${blog.id}`}>
            {blog.title} {blog.author}
          </Link>
        </div>
      ))}
    </div>
  )
}

export default Blogs
