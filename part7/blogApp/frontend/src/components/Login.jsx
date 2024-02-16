import LoginForm from './LoginForm'
import Notification from './Notification'

const Login = ({ login }) => {
  return (
    <div>
      <h2>Blogs</h2>
      <h2>log in to application</h2>
      <Notification />
      <LoginForm login={login} />
    </div>
  )
}

export default Login
