import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import { setNotification } from './notificationReducer'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload
    },
    setBlog(state, action) {
      return state.map((blog) =>
        blog.id === action.payload.id ? action.payload : blog
      )
    },
    appendBlog(state, action) {
      state.push(action.payload)
    },
    removeBlog(state, action) {
      return state.filter((blog) => blog.id !== action.payload.id)
    },
  },
})

export const { setBlogs, setBlog, appendBlog, removeBlog } = blogSlice.actions

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = (blogObject) => {
  return async (dispatch) => {
    try {
      const newBlog = await blogService.create(blogObject)
      dispatch(appendBlog(newBlog))
      dispatch(
        setNotification(
          { message: `a new blog ${newBlog.title} by ${newBlog.author} added` },
          5
        )
      )
    } catch (exception) {
      dispatch(
        setNotification({ message: 'missing title or url', type: 'alert' }, 5)
      )
    }
  }
}

export const incrementLike = (blog) => {
  return async (dispatch) => {
    try {
      const updatedBlog = await blogService.update({
        ...blog,
        likes: blog.likes + 1,
      })
      dispatch(setBlog(updatedBlog))
      dispatch(
        setNotification(
          { message: `blog ${blog.title} by ${blog.author} likes increased` },
          5
        )
      )
    } catch (exception) {
      dispatch(
        setNotification(
          { message: exception.response.data.error, type: 'alert' },
          5
        )
      )
    }
  }
}

export const deleteBlog = (blog) => {
  return async (dispatch) => {
    try {
      await blogService.remove(blog)
      dispatch(removeBlog(blog))
      dispatch(
        setNotification(
          {
            message: `Successfully removed blog ${blog.title} by ${blog.author}`,
          },
          5
        )
      )
    } catch (exception) {
      dispatch(
        setNotification(
          { message: exception.response.data.error, type: 'alert' },
          5
        )
      )
    }
  }
}

export default blogSlice.reducer
