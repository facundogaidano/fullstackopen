import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useState, useEffect, useContext } from 'react'
import { getBlogs } from './requests'
import { UserContext, actions } from './reducers/userReducer'
import storageService from './services/storage'
import loginService from './services/login'

import Login from './components/Login'
import BlogList from './components/BlogList'
import Notification from './components/Notification'

const App = () => {
  const [user, setUser] = useState('')
  const { dispatch: logoutDispatch } = useContext(UserContext)
  const queryClient = useQueryClient()

  useEffect(() => {
    const user = storageService.loadUser()
    setUser(user)
  }, [])

  const result = useQuery({
    queryKey: ['blogs'],
    queryFn: getBlogs,
    retry: 1
  })

  if (result.isLoading) {
    return <div>loading data...</div>
  }

  const blogs = result.data

  const login = async (username, password) => {
    try {
      const user = await loginService.login({ username, password })
      setUser(user)
      storageService.saveUser(user)
    } catch (e) {
      console.log(e)
    }
  }

  const handleLogout = () => {
    logoutDispatch({ type: actions.LOGOUT })
    storageService.removeUser()
    setUser('')
    queryClient.invalidateQueries('login')
  }

  if (!user) {
    return <Login login={login} />
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      <BlogList user={user} logout={handleLogout} blogs={blogs} />
    </div>
  )
}

export default App
