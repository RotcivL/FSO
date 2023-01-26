import { createSlice } from '@reduxjs/toolkit'
const initialState = ''

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification(state, action) {
      state = action.payload
    },
    clearNotification(state, action) {
      state = ''
    }
  },
})

export const { setNotification } = notificationSlice.actions
export default notificationSlice.reducer