import { Divider, List, ListItem, ListItemText } from '@mui/material'
const User = ({ user }) => {
  if (!user) {
    return null
  }
  const blogs = user.blogs

  return (
    <div>
      <h2>{user.name}</h2>
      <h3>Added blogs</h3>
      <List>
        {blogs.map((blog) => (
          <>
            <ListItem key={blog.id}>
              <ListItemText primary={blog.title} secondary={blog.author} />
            </ListItem>
            <Divider />
          </>
        ))}
      </List>
    </div>
  )
}

export default User
