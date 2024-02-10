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
    blogService.getAll().then(blogs => {
      // Ordena las publicaciones por el número de likes
      const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes)
      setBlogs(sortedBlogs)
    }).catch(() => {
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

  const handleDeleteBlog = async (id) => {
    try {
      await blogService.deleteBlog(id)
      setBlogs(blogs.filter(blog => blog.id !== id))
    } catch (error) {
      console.error('Error deleting blog:', error)
      // Handle the error, e.g., show a notification
    }
  }

  return (
    <div>
      <Notification message={errorMessage} style={style} />
      <h2>blogs</h2>
      {user
        ? (
          <div>
            <p>{user && user.name} logged in <button onClick={handleLogout}>Logout</button></p>
            <CreateBlog
              addBlog={addBlog}
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
        <Blog key={blog.id} blog={blog} userId={user.id} user={user} onDelete={handleDeleteBlog} />
      )}
    </div>
  )
}

export default App
