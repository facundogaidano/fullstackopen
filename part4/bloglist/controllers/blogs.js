const bloglistsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')

bloglistsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '')
  }
  return null
}

bloglistsRouter.post('/', async (request, response) => {
  const { title, author, url } = request.body

  const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }
  const user = request.user
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
    const blogWithUser = await Blog.findById(savedBlog._id).populate('user', { username: 1, name: 1 })
    response.status(201).json(blogWithUser)
  }
})

bloglistsRouter.delete('/:id', async (request, response) => {
  const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }

  const blogToDelete = await Blog.findById(request.params.id)
  if (!blogToDelete) {
    return response.status(404).json({ error: 'blog not found' })
  }

  const user = request.user
  if (!user) {
    return response.status(400).json({ error: 'Invalid user ID' })
  }

  if (String(blogToDelete.user) !== String(user._id)) {
    return response.status(403).json({ error: 'not allowed to delete this blog' })
  }

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
