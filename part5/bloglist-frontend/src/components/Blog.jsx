import React from 'react'
import Toggable from './Toggable'

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: 'solid',
  borderWidth: 1,
  marginBottom: 5
}

const Blog = ({ blog, userId, onDelete, updateBlogLikes }) => {
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
      <div>{blog.title}, {blog.author}</div>
      <Toggable key={blog.id} buttonLabel='View' cancelButtonLabel='Hide'>
        <div>
          <div>{blog.url}</div>
          <div>likes {blog.likes} <button onClick={addLike}>Like</button></div>
          <div>{blog.user ? blog.user.name : ''}</div>
          {blog.user && blog.user.id === userId && (
            <div><button onClick={handleDelete}>Delete</button></div>
          )}

        </div>
      </Toggable>
    </div>
  )
}

export default Blog
