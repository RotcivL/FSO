import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import blogService from '../services/blogs'
import userService from '../services/users'
import { setNotification } from './notificationReducer'

const userSlice = createSlice({
  name: 'user',
  initialState: { user: null, users: [] },
  reducers: {
    setUser(state, action) {
      return { ...state, user: action.payload }
    },
    setUsers(state, action) {
      return { ...state, users: action.payload }
    },
    resetUser(state) {
      return { ...state, user: null }
    },
  },
})

export const { setUser, resetUser, setUsers } = userSlice.actions

export const initializeUsers = () => {
  return async (dispatch) => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
      blogService.setToken(user.token)
    }
    const users = await userService.getAll()
    dispatch(setUsers(users))
  }
}

export const login = (loginInfo) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login(loginInfo)
      window.localStorage.setItem('loggedBloglistUser', JSON.stringify(user))
      dispatch(setUser(user))
      blogService.setToken(user.token)
      dispatch(setNotification({ message: 'Successfully logged in' }, 5))
    } catch (exception) {
      dispatch(
        setNotification(
          { message: 'wrong username or password', type: 'alert' },
          5
        )
      )
    }
  }
}

export const logout = () => {
  return (dispatch) => {
    dispatch(resetUser())
    window.localStorage.removeItem('loggedBloglistUser')
    blogService.setToken(null)
    dispatch(setNotification({ message: 'Logged Out' }, 5))
  }
}

export default userSlice.reducer
