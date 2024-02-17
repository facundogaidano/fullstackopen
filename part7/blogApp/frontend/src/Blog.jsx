import { useParams } from 'react-router-dom'
import { useQueryClient, useMutation } from '@tanstack/react-query'
import { updateLike, deleteBlog, addComment } from './requests'
import { NotificationContext } from './reducers/notificationReducer'
import { useContext, useState } from 'react'

const Blog = ({ blogs, user }) => {
  const [comment, setComment] = useState('')
  const [comments, setComments] = useState([])
  const id = useParams().blogId
  const queryClient = useQueryClient()
  const { dispatch } = useContext(NotificationContext)
  let blog = null

  if (blogs && id) {
    blog = blogs.find(bl => bl.id === id)
  }

  const handleCommentSubmit = async (event) => {
    event.preventDefault()
    if (comment) {
      const newComment = await addComment(blog.id, comment)
      setComments([...comments, newComment])
      setComment('')
    }
  }

  const deleteBlogMutation = useMutation({
    mutationFn: deleteBlog,
    onSuccess: () => {
      queryClient.invalidateQueries(['blogs'])
    }
  })

  const addLikeMutation = useMutation({
    mutationFn: updateLike,
    onSuccess: () => {
      queryClient.invalidateQueries('blogs')
    }
  })

  const remove = async (blog) => {
    const ok = window.confirm(`Sure you want to remove '${blog.title}' by ${blog.author}?`)
    if (ok) {
      await deleteBlogMutation.mutateAsync(blog.id)
      dispatch({
        type: 'SHOW_NOTIFICATION',
        message: `Blog ${blog.title} deleted`,
        typeNoti: 'success'
      })
      setTimeout(() => {
        dispatch({ type: 'CLEAR_NOTIFICATION' })
      }, 5000)
    } else {
      dispatch({
        type: 'SHOW_NOTIFICATION',
        message: `Blog ${blog.title} was already deleted`,
        typeNoti: 'error'
      })
      setTimeout(() => {
        dispatch({ type: 'CLEAR_NOTIFICATION' })
      }, 5000)
    }
  }

  const like = async (blog) => {
    await addLikeMutation.mutateAsync(blog)
    dispatch({
      type: 'SHOW_NOTIFICATION',
      message: `Blog ${blog.title} by ${blog.author} liked`,
      typeNoti: 'success'
    })
    setTimeout(() => {
      dispatch({ type: 'CLEAR_NOTIFICATION' })
    }, 5000)
  }

  return (
    <>
      <div>
        <h1>{blog.title} {blog.author}</h1>
        <div>
          <a target='_blank' href={`${blog.url}`} rel='noreferrer'>{blog.url}</a> <br />
          {blog.likes} likes <button onClick={() => like(blog)}>like</button><br />
          {/* added by {blog.user} */}
          {(user && blog.user.username === user.username) && <button onClick={remove}>delete</button>}
        </div>
      </div>
      <div>
        <div>
          <h2>Comments</h2>
          <form onSubmit={handleCommentSubmit}>
            <input
              type='text'
              value={comment}
              onChange={(event) => setComment(event.target.value)}
              placeholder='Add a comment'
            />
            <button type='submit'>Add comment</button>
          </form>
          <ul>
            {blog.comments.map((comment) => (
              <li key={comment.id}>{comment.content}</li>
            ))}
          </ul>
        </div>
      </div>
    </>
  )
}

export default Blog
