const bloglistsRouter = require('express').Router()
const Blog = require('../models/bloglist')

bloglistsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

bloglistsRouter.post('/', async (request, response) => {
  const blog = new Blog({
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes || 0 // 0 es el Default.
  })
  if (!blog.title || !blog.url) {
    return response.status(400).json({ error: 'title and url are required' })
  } else {
    const savedBlog = await blog.save()
    response.status(201).json(savedBlog)
  }
})

module.exports = bloglistsRouter
