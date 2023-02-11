import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from '@mui/material'

const Blogs = () => {
  const byLIkes = (a1, a2) => (a2.likes > a1.likes ? 1 : -1)
  const blogs = useSelector((state) => [...state.blog].sort(byLIkes))

  return (
    <div>
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            {blogs.map((blog) => (
              <TableRow className="blog" key={blog.id}>
                <TableCell component={Link} to={`/blogs/${blog.id}`}>
                  {blog.title}
                </TableCell>
                <TableCell align="right">{blog.author}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default Blogs
