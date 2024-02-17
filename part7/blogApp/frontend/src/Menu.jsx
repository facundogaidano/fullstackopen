import { Link } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import Button from 'react-bootstrap/Button'
import { UserContext, actions } from './reducers/userReducer'

import storageService from './services/storage'
import { useContext } from 'react'
import { useQueryClient } from '@tanstack/react-query'

const Menu = ({ user, setUser }) => {
  const { dispatch: logoutDispatch } = useContext(UserContext)
  const queryClient = useQueryClient()

  const handleLogout = () => {
    logoutDispatch({ type: actions.LOGOUT })
    storageService.removeUser()
    setUser('')
    queryClient.invalidateQueries('login')
  }

  return (
    <Navbar bg='light' data-bs-theme='light' collapseOnSelect expand='lg'>
      <Container>
        <Navbar.Collapse id='responsive-navbar-nav'>
          <Nav variant='underline' defaultActiveKey='/' className='me-auto'>
            <Nav.Link href='/' as='span'>
              <Link style={{ textDecoration: 'none' }} to='/'>Blogs</Link>
            </Nav.Link>
            <Nav.Link href='/users' as='span'>
              <Link style={{ textDecoration: 'none' }} to='/users'>Users</Link>
            </Nav.Link>
            {user
              ? (
                <div className='d-flex align-items-center justify-content-center'>
                  <span className='me-2'>{user.name} logged in </span>
                  <Button variant='danger' size='sm' onClick={handleLogout}>logout</Button>
                </div>
                )
              : (
                <Nav.Link href='/login' as='span'>
                  <Link to='/login'>
                    <Button size='sm'>Login</Button>
                  </Link>
                </Nav.Link>
                )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Menu
