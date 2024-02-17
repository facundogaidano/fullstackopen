import LoginForm from './LoginForm'
import Notification from './Notification'

const Login = ({ login }) => {
  return (
    <div>
      <h2>Login</h2>
      <Notification />
      <LoginForm login={login} />
    </div>
  )
}

export default Login
