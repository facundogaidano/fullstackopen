import { createContext, useReducer } from 'react'

export const initialState = {
  user: null
}

export const actions = {
  SET_USER: 'SET_USER',
  LOGOUT: 'LOGOUT'
}

export function userReducer (state, action) {
  switch (action.type) {
    case actions.SET_USER:
      return { ...state, user: action.payload }
    case actions.LOGOUT:
      return { ...state, user: null }
    default:
      throw new Error(`Unknown action: ${action.type}`)
  }
}

export const UserContext = createContext()

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState)

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  )
}
