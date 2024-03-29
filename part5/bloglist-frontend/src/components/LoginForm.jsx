import React, { useState } from 'react'
import Toggable from './Toggable'
// import PropTypes from 'prop-types'

export default function LoginForm ({ loginUser }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSummitLogin = async (event) => {
    event.preventDefault()
    setUsername('')
    setPassword('')

    loginUser({ username, password })
  }

  return (
    <Toggable buttonLabel='Show Login'>
      <h2>Login to application</h2>
      <form onSubmit={handleSummitLogin}>
        <div>
          Username
          <input
            type='text'
            value={username}
            name='Username'
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          Password
          <input
            type='password'
            value={password}
            name='Password'
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button data-cy='login' type='submit'>Login</button>
      </form>
    </Toggable>
  )
}
