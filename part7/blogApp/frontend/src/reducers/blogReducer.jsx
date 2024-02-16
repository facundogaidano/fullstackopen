import { createContext, useReducer } from 'react'

export const initialState = {
  blogs: []
}

export const actionTypes = {
  SET_BLOGS: 'SET_BLOGS',
  ADD_BLOG: 'ADD_BLOG'
}

export const blogReducer = (state, action) => {
  switch (action.type) {
    case 'SET_BLOGS':
      return { ...state, blogs: action.payload }
    case 'ADD_BLOG':
      return { ...state, blogs: [...state.blogs, action.payload] }
    default:
      throw new Error(`Unknown action: ${action.type}`)
  }
}

export const BlogContext = createContext()

export const BlogProvider = ({ children }) => {
  const [state, dispatch] = useReducer(blogReducer, initialState)

  return (
    <BlogContext.Provider value={{ state, dispatch }}>
      {children}
    </BlogContext.Provider>
  )
}
