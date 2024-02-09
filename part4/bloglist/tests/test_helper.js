const Blog = require('../models/blog')
const User = require('../models/user')

const initialUsers = [
  {
    username: 'MrFakon',
    name: 'Facundo',
    password: 'passworddeprueba'
  },
  {
    username: 'zero',
    name: 'Z3ro',
    password: 'polloboy'
  }
]

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

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

module.exports = {
  initialBlogs, nonExistingId, blogsInDb, initialUsers, usersInDb
}
