import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import CreateBlog from './components/CreateBlog'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [style, setStyle] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    ).catch(() => {
      setStyle('error')
      setErrorMessage('error fetching data from backend api')
      setTimeout(() => { setErrorMessage(null) }, 5000)
    })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const addBlog = (blogObject) => {
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(prevBlogs => prevBlogs.concat(returnedBlog))
        setErrorMessage(`A new blog ${returnedBlog.title} by ${returnedBlog.author} added`)
        setStyle('success')
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      }).catch(() => {
        setErrorMessage('Something went wrong when creating the blog')
        setStyle('error')
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
  }

  const loginUser = async ({ username, password }) => {
    try {
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      )

      blogService
        .setToken(user.token)
      setUser(user)
      setErrorMessage('You successully logged in!')
      setStyle('success')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    } catch (exception) {
      setErrorMessage('Wrong username or password')
      setStyle('error')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    setUser(null)
    blogService.setToken(user.token)
    window.localStorage.removeItem('loggedNoteappUser')
  }

  return (
    <div>
      <Notification message={errorMessage} style={style} />
      {user
        ? (
          <div>
            <CreateBlog
              addBlog={addBlog}
              handleLogout={handleLogout}
              user={user}
            />
          </div>
          )
        : (
          <div>
            <LoginForm
              loginUser={loginUser}
            />
          </div>
          )}
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App
