import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

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
    const newBlog = await blogService.create(blogObject)
    dispatch(appendBlog(newBlog))
  }
}

export const incrementLike = (blog) => {
  return async (dispatch) => {
    const updatedBlog = await blogService.update({
      ...blog,
      likes: blog.likes + 1,
    })
    dispatch(setBlog(updatedBlog))
  }
}

export const deleteBlog = (blog) => {
  return async (dispatch) => {
    await blogService.remove(blog)
    dispatch(removeBlog(blog))
  }
}

export default blogSlice.reducer
