const bloglistsRouter = require('express').Router()
const Blog = require('../models/bloglist')

bloglistsRouter.get('/', (request, response, next) => {
  Blog.find({}).then(notes => {
    response.json(notes)
  })
})

bloglistsRouter.post('/', (request, response) => {
  const blog = new Blog(request.body)

  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
})

module.exports = bloglistsRouter
