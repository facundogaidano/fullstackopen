import { useContext } from 'react'
import { NotificationContext } from '../reducers/notificationReducer'
import Alert from 'react-bootstrap/Alert'

const Notification = () => {
  const { state, typeNoti } = useContext(NotificationContext)
  const variant = typeNoti === 'error' ? 'danger' : 'success'

  if (!state || !state.message) {
    return null // No renderiza nada si el estado es null o si el mensaje está vacío
  }

  return (
    <Alert variant={variant}>
      <Alert.Heading>{state.message}</Alert.Heading>
    </Alert>
  )
}

export default Notification
