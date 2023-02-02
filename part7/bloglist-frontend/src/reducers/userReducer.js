import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import blogService from '../services/blogs'
import { setNotification } from './notificationReducer'

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload
    },
    resetUser() {
      return null
    },
  },
})

export const { setUser, resetUser } = userSlice.actions

export const initializeUser = () => {
  return (dispatch) => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
      blogService.setToken(user.token)
    }
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
