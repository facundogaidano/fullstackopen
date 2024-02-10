import React, { useState } from 'react'
import Toggable from './Toggable'
import blogService from '../services/blogs'

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: 'solid',
  borderWidth: 1,
  marginBottom: 5
}

const Blog = ({ blog, user, userId, onDelete }) => {
  const [likes, setLikes] = useState(blog.likes)

  const handleLike = async () => {
    try {
      const updatedBlog = await blogService.update(blog.id, { ...blog, likes: likes + 1 })
      setLikes(updatedBlog.likes)
    } catch (error) {
      console.error('Error updating likes:', error)
    }
  }

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

  return (
    <div style={blogStyle}>
      <div>{blog.title}, {blog.author}</div>
      <Toggable key={blog.id} buttonLabel='View' cancelButtonLabel='Hide'>
        <div>
          <div>{blog.url}</div>
          <div>likes {likes} <button onClick={handleLike}>Like</button></div>
          <div>{blog.user.name}</div>
          {console.log('blog.user', blog.user)}
          {console.log('blog.user.id', blog.user.id)}
          {console.log('userId', userId)}

          {blog.user && blog.user.id === userId && (
            <div><button onClick={handleDelete}>Delete</button></div>
          )}

        </div>
      </Toggable>
    </div>
  )
}

export default Blog
