import React, { createContext, useReducer } from 'react'

const initialState = {
  message: ''
}

function notificationReducer (state, action) {
  switch (action.type) {
    case 'SHOW_NOTIFICATION':
      return {
        message: action.message
      }
    case 'CLEAR_NOTIFICATION':
      return {
        message: ''
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
