import { createSlice } from '@reduxjs/toolkit'

let timeout

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    setNotificationAction(state, action) {
      return action.payload
    },
    clearNotification(state) {
      return ''
    }
  },
})

export const { setNotificationAction, clearNotification } = notificationSlice.actions

export const setNotification = (message, seconds) => {
  return dispatch => {
    clearTimeout(timeout)
    dispatch(setNotificationAction(message))
    timeout = setTimeout(() => {
      dispatch(clearNotification())
    }, 1000*seconds)
  }
}

export default notificationSlice.reducer