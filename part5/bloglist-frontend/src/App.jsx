import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import CreateBlog from './components/CreateBlog'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [blogsVersion, setBlogsVersion] = useState(0)

  const [errorMessage, setErrorMessage] = useState(null)
  const [style, setStyle] = useState('')
  const [user, setUser] = useState(null)
  const [name, setName] = useState('')

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
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    if (user) {
      setName(user.name)
    }
  }, [user])

  const addBlog = (blogObject) => {
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        console.log('Returned blog:', returnedBlog)
        setBlogs(prevBlogs => [...prevBlogs, returnedBlog])
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
        'loggedBlogappUser', JSON.stringify(user)
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
    window.localStorage.removeItem('loggedBlogappUser')
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

  const updateBlogLikes = async (blogId) => {
    const blogToUpdate = blogs.find((blog) => blog.id === blogId)
    const updatedBlog = { ...blogToUpdate, likes: blogToUpdate.likes + 1 }

    try {
      await blogService.addLike(updatedBlog)
      setBlogsVersion(blogsVersion + 1)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div>
      <Notification message={errorMessage} style={style} />
      <h2>Blogs</h2>
      {!user && (
        <>
          <LoginForm
            loginUser={loginUser}
          />
        </>
      )}
      {user && (
        <>
          <p>{name} logged in <button data-cy='logoutButton' onClick={handleLogout}>Logout</button></p>
          {console.log(user.username)}
          <CreateBlog
            addBlog={addBlog}
            user={user}
          />
          {blogs.map(blog =>
            <Blog
              key={blog.id}
              blog={blog}
              username={user.username}
              onDelete={handleDeleteBlog}
              updateBlogLikes={updateBlogLikes}
            />
          )}
        </>
      )}
    </div>
  )
}

export default App
