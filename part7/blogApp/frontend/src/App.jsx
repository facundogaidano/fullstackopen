import { useQuery } from '@tanstack/react-query'
import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { getBlogs, getUsers } from './requests'
import 'bootstrap/dist/css/bootstrap.min.css'

import storageService from './services/storage'
import Login from './components/Login'
import BlogList from './components/BlogList'
import Notification from './components/Notification'
import UsersList from './UsersList'
import UsersBlogs from './UsersBlogs'
import Blog from './Blog'
import Menu from './Menu'
import loginService from './services/login'

const App = () => {
  const [user, setUser] = useState('')

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

  return (
    <div className='container'>
      <Menu user={user} setUser={setUser} />
      <Notification />
      <Routes>
        <Route path='/' element={<BlogList user={user} blogs={blogs} />} />
        <Route path='/blogs' element={<BlogList blogs={blogs} />} />
        <Route path='/blogs/:blogId' element={<Blog user={user} blogs={blogs} />} />
        <Route path='/users' element={<UsersList users={users} />} />
        <Route path='/users/:userId' element={<UsersBlogs users={users} />} />
        <Route path='/login' element={<Login login={login} />} />
      </Routes>
    </div>
  )
}

export default App
