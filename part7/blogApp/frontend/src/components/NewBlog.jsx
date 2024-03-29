import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState, useRef, useContext } from 'react'
import { NotificationContext } from '../reducers/notificationReducer'
import { createBlog } from '../requests'
import Togglable from './Togglable'
import { BlogContext } from '../reducers/blogReducer'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

const BlogForm = () => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const queryClient = useQueryClient()
  const { dispatch: notificationDispatch } = useContext(NotificationContext)
  const togglableRef = useRef()
  const { dispatch: blogDispatch } = useContext(BlogContext)

  const newBlogMutation = useMutation({
    mutationFn: createBlog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
    }
  })

  const addBlog = async (event) => {
    event.preventDefault()
    const newBlog = {
      title: event.target.title.value,
      author: event.target.author.value,
      url: event.target.url.value,
      likes: 0
    }
    try {
      await newBlogMutation.mutateAsync(newBlog)
      blogDispatch({
        type: 'ADD_BLOG',
        payload: newBlog
      })
      // Limpia los campos del formulario
      setTitle('')
      setAuthor('')
      setUrl('')
      // Muestra una notificación
      notificationDispatch({
        type: 'SHOW_NOTIFICATION',
        message: `Blog ${newBlog.title} by ${newBlog.author} added`,
        typeNoti: 'success'
      })
      setTimeout(() => {
        notificationDispatch({ type: 'CLEAR_NOTIFICATION' })
      }, 5000)
    } catch (error) {
      console.log(error)
      // Muestra una notificación de error
      notificationDispatch({
        type: 'SHOW_NOTIFICATION',
        message: `Failed to add blog ${newBlog.title} by ${newBlog.author}`,
        typeNoti: 'error'
      })
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      await addBlog(event)
      togglableRef.current.toggleVisibility()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <Togglable buttonLabel='New Blog' ref={togglableRef}>
        <h4>Create a new blog</h4>

        <Form onSubmit={handleSubmit}>
          <Form.Group className='mb-3'>
            <Form.Label>Title</Form.Label>
            <Form.Control type='text' placeholder='Enter title' onChange={({ target }) => setTitle(target.value)} value={title} />
          </Form.Group>
          <Form.Group className='mb-3'>
            <Form.Label>Author</Form.Label>
            <Form.Control type='text' placeholder='Enter author' onChange={({ target }) => setAuthor(target.value)} value={author} />
          </Form.Group>
          <Form.Group className='mb-3'>
            <Form.Label>URL</Form.Label>
            <Form.Control type='url' placeholder='Enter url' onChange={({ target }) => setUrl(target.value)} value={url} />
          </Form.Group>
          <Button variant='success' className='me-2' type='submit'>Create</Button>
          <Button variant='secondary' onClick={() => togglableRef.current.toggleVisibility()}>Cancel</Button>
        </Form>
      </Togglable>
    </div>
  )
}

export default BlogForm
