import { createSlice } from '@reduxjs/toolkit'

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
    dispatch(setNotificationAction(message))
    setTimeout(() => {
      dispatch(clearNotification())
    }, 1000*seconds)
  }
}

export default notificationSlice.reducer