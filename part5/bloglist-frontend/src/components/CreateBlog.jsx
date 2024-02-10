import React, { useRef, useState } from 'react'
import Toggable from './Toggable'

export default function CreateBlog ({ addBlog, user }) {
  const [newBlogTitle, setNewBlogTitle] = useState('')
  const [newBlogAuthor, setNewBlogAuthor] = useState('')
  const [newBlogUrl, setNewBlogUrl] = useState('')
  const toggableRef = useRef()

  const handleNewBlogChange = (event) => {
    const { name, value } = event.target
    switch (name) {
      case 'title':
        setNewBlogTitle(value)
        break
      case 'author':
        setNewBlogAuthor(value)
        break
      case 'url':
        setNewBlogUrl(value)
        break
      default:
        break
    }
  }

  const handleSubmitBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      title: newBlogTitle,
      author: newBlogAuthor,
      url: newBlogUrl,
      userId: user.id
    }
    setNewBlogTitle('')
    setNewBlogAuthor('')
    setNewBlogUrl('')

    addBlog(blogObject)
    toggableRef.current.toggleVisibility()
  }

  return (
    <Toggable buttonLabel='New Blog' cancelButtonLabel='Cancel' ref={toggableRef}>
      <h2>Create New Blog</h2>
      <form onSubmit={handleSubmitBlog}>
        <div>
          Title
          <input
            type='text'
            value={newBlogTitle}
            name='title'
            onChange={handleNewBlogChange}
          />
        </div>
        <div>
          Author
          <input
            type='text'
            value={newBlogAuthor}
            name='author'
            onChange={handleNewBlogChange}
          />
        </div>
        <div>
          URL
          <input
            type='text'
            value={newBlogUrl}
            name='url'
            onChange={handleNewBlogChange}
          />
        </div>
        <button type='submit'>Create</button>
      </form>
    </Toggable>
  )
}
