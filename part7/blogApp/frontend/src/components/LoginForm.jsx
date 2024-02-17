import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const LoginForm = ({ login }) => {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()
    await login(username, password)
    navigate('/')
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group style={{ marginTop: 10 }}>
        <Form.Label>Username</Form.Label>
        <Form.Control type='text' placeholder='Enter username' onChange={({ target }) => setUsername(target.value)} value={username} />
      </Form.Group>
      <Form.Group style={{ marginTop: 10 }}>
        <Form.Label>Password</Form.Label>
        <Form.Control type='password' placeholder='Enter password' onChange={({ target }) => setPassword(target.value)} value={password} />
      </Form.Group>
      <Button style={{ marginTop: 10 }} id='login-button' type='submit'>
        login
      </Button>
    </Form>
  )
}

export default LoginForm
