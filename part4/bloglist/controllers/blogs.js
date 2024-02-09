const bloglistsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

bloglistsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

bloglistsRouter.post('/', async (request, response) => {
  const { title, author, url, userId } = request.body

  const user = await User.findById(userId)
  if (!user) {
    return response.status(400).json({ error: 'Invalid user ID' })
  }

  const blog = new Blog({
    title,
    author,
    url,
    likes: request.body.likes || 0, // 0 es el Default.
    user: user._id
  })
  if (!blog.title || !blog.url) {
    return response.status(400).json({ error: 'title and url are required' })
  } else {
    const savedBlog = await blog.save()
    response.status(201).json(savedBlog)
  }
})

bloglistsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

bloglistsRouter.put('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if (blog) {
    blog.likes = request.body.likes
    const updatedBlog = await blog.save()
    response.json(updatedBlog)
  } else {
    response.status(404).end()
  }
})

module.exports = bloglistsRouter
