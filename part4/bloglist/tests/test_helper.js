const Blog = require('../models/bloglist')

const initialBlogs = [
  {
    title: 'Title generico',
    author: 'Autor generico',
    url: 'url',
    likes: 10
  },
  {
    title: 'Title generico 2',
    author: 'Autor generico 2',
    url: 'url',
    likes: 15
  }
]

const nonExistingId = async () => {
  const blog = new Blog({ content: 'willremovethissoon', date: new Date() })
  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs, nonExistingId, blogsInDb
}
