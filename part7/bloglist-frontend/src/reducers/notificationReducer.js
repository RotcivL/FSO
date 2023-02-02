import { createSlice } from '@reduxjs/toolkit'

let timeout

const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    setNotificationAction(state, action) {
      return action.payload
    },
    clearNotification() {
      return null
    },
  },
})

export const { setNotificationAction, clearNotification } =
  notificationSlice.actions

export const setNotification = (notification, seconds) => {
  return (dispatch) => {
    clearTimeout(timeout)
    dispatch(setNotificationAction(notification))
    timeout = setTimeout(() => {
      dispatch(clearNotification())
    }, 1000 * seconds)
  }
}

export default notificationSlice.reducer
