import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useState, useEffect, useContext } from 'react'
import { Routes, Route } from 'react-router-dom'
import { getBlogs, getUsers } from './requests'
import { UserContext, actions } from './reducers/userReducer'
import storageService from './services/storage'
import loginService from './services/login'

import Login from './components/Login'
import BlogList from './components/BlogList'
import Notification from './components/Notification'
import UsersList from './UsersList'
import UsersBlogs from './UsersBlogs'

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

  const usersResult = useQuery({
    queryKey: ['users'],
    queryFn: getUsers,
    retry: 1
  })

  if (result.isLoading) {
    return <div>loading data...</div>
  }

  if (usersResult.isLoading) {
    return <div>loading users...</div>
  }

  const blogs = result.data

  const users = usersResult.data

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
      {user.name} logged in
      <button onClick={handleLogout}>logout</button>
      <Notification />
      <Routes>
        <Route path='/' element={<BlogList user={user} blogs={blogs} />} />
        <Route path='/blogs' element={<BlogList user={user} blogs={blogs} />} />
        <Route path='/users' element={<UsersList users={users} />} />
        <Route path='/users/:userId' element={<UsersBlogs users={users} />} />
      </Routes>
    </div>
  )
}

export default App
