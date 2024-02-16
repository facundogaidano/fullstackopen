import { useContext } from 'react'
import { NotificationContext } from '../reducers/notificationReducer'

const Notification = () => {
  const { state, typeNoti } = useContext(NotificationContext)
  const style = {
    display: state.message ? 'block' : 'none',
    color: typeNoti === 'error' ? 'red' : 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  return (
    <div style={style}>
      {state.message}
    </div>
  )
}

export default Notification
