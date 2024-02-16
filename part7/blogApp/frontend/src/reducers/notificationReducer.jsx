import { createContext, useReducer } from 'react'

const initialState = {
  message: '',
  typeNoti: ''
}

function notificationReducer (state, action) {
  switch (action.type) {
    case 'SHOW_NOTIFICATION':
      return {
        message: action.message,
        typeNoti: action.type
      }
    case 'CLEAR_NOTIFICATION':
      return {
        message: '',
        typeNoti: ''
      }
    default:
      throw new Error(`Unknown action: ${action.type}`)
  }
}

export const NotificationContext = createContext()

export const NotificationProvider = ({ children }) => {
  const [state, dispatch] = useReducer(notificationReducer, initialState)

  return (
    <NotificationContext.Provider value={{ state, dispatch }}>
      {children}
    </NotificationContext.Provider>
  )
}
