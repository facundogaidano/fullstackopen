import { createContext, useContext, useReducer } from 'react'

const NotificationStateContext = createContext()
const NotificationDispatchContext = createContext()

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'ADD':
      return { message: action.payload.message, type: action.payload.type }
    case 'REMOVE':
      return { message: null, type: null }
    default:
      throw new Error(`Unhandled action type: ${action.type}`)
  }
}

export const NotificationProvider = ({ children }) => {
  const [state, dispatch] = useReducer(notificationReducer, { message: null, type: null })

  return (
    <NotificationStateContext.Provider value={state}>
      <NotificationDispatchContext.Provider value={dispatch}>
        {children}
      </NotificationDispatchContext.Provider>
    </NotificationStateContext.Provider>
  )
}

export const useNotification = () => {
  const context = useContext(NotificationStateContext)
  if (context === undefined) {
    throw new Error('useNotification must be used within a NotificationProvider')
  }
  return context
}

export const useNotificationDispatch = () => {
  const context = useContext(NotificationDispatchContext)
  if (context === undefined) {
    throw new Error('useNotificationDispatch must be used within a NotificationProvider')
  }
  return context
}
