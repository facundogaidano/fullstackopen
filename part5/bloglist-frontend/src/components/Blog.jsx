import React from 'react'
import Toggable from './Toggable'

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: 'solid',
  borderWidth: 1,
  marginBottom: 5
}

const Blog = ({ blog, username, onDelete, updateBlogLikes }) => {
  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this blog post?')) {
      try {
        await onDelete(blog.id)
      } catch (error) {
        console.error('Error deleting blog:', error)
        // Handle the error, e.g., show a notification
      }
    }
  }

  const addLike = async () => {
    try {
      updateBlogLikes(blog.id)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div style={blogStyle}>
      <div>{blog.title}, {blog.author}
        <Toggable key={blog.id} buttonLabel='View' cancelButtonLabel='Hide'>
          <div>
            <div>{blog.url}</div>
            <div>
              likes{' '}
              <span data-cy='likeCount'>{blog.likes}</span>{' '}
              <button onClick={addLike}>Like</button>
            </div>
            <div>
              {console.log(username, 'username')}
              {console.log(blog.user.username, 'blog.user.username')}
              {username === blog.user.username
                ? <button data-cy='deleteButton' onClick={handleDelete}>Delete Blog</button>
                : null}
            </div>
          </div>
        </Toggable>
      </div>
    </div>
  )
}

export default Blog
