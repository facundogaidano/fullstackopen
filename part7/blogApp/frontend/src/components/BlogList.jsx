import NewBlog from '../components/NewBlog'
import Blog from './Blog'
import { useQueryClient, useMutation } from '@tanstack/react-query'
import { updateLike, deleteBlog } from '../requests'
import { NotificationContext } from '../reducers/notificationReducer'
import { useContext } from 'react'

const BlogList = ({ user, blogs }) => {
  const queryClient = useQueryClient()
  const { dispatch } = useContext(NotificationContext)

  const byLikes = (b1, b2) => b2.likes - b1.likes

  const addLikeMutation = useMutation({
    mutationFn: updateLike,
    onSuccess: () => {
      queryClient.invalidateQueries('blogs')
    }
  })

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

  const deleteBlogMutation = useMutation({
    mutationFn: deleteBlog,
    onSuccess: () => {
      queryClient.invalidateQueries(['blogs'])
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

  return (
    <>
      <div>
        <NewBlog />
      </div>
      <div>
        {blogs && blogs.sort(byLikes).map(blog =>
          <Blog
            key={blog.id}
            blog={blog}
            like={() => like(blog)}
            canRemove={user && blog.user.username === user.username}
            remove={() => remove(blog)}
          />
        )}
      </div>
    </>
  )
}

export default BlogList
