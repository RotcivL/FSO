import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { login } from '../reducers/userReducer'

import { TextField, Button } from '@mui/material'

const LoginForm = () => {
  const dispatch = useDispatch()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = (event) => {
    event.preventDefault()
    dispatch(
      login({
        username: username,
        password: password,
      })
    )
    setUsername('')
    setPassword('')
  }

  return (
    <form onSubmit={handleLogin}>
      <div>
        <TextField
          label="username"
          value={username}
          onChange={(event) => {
            setUsername(event.target.value)
          }}
        />
      </div>
      <div>
        <TextField
          label="password"
          type="password"
          value={password}
          onChange={(event) => {
            setPassword(event.target.value)
          }}
        />
      </div>
      <Button variant="contained" color="primary" type="submit">
        login
      </Button>
    </form>
  )
}

export default LoginForm
