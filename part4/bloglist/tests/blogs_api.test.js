const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')
const User = require('../models/user')

beforeEach(async () => {
  await Blog.deleteMany({})

  for (const blog of helper.initialBlogs) {
    const blogObject = new Blog(blog)
    await blogObject.save()
  }
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

describe('Blog model', () => {
  test('id field is defined', async () => {
    const blog = new Blog({
      title: 'String',
      author: 'String',
      url: 'String',
      likes: 11
    })

    await blog.save()

    const blogJSON = blog.toJSON()
    expect(blogJSON.id).toBeDefined()
    expect(blogJSON._id).toBeUndefined()
  })
})

describe('when a new blog is created', () => {
  let token
  let userId

  beforeAll(async () => {
    await User.deleteMany({})
    userId = await helper.createUser() // Obtiene el ID del usuario creado
    token = await helper.getTokenForUser(userId) // Get users ID token.
  })

  test('it is saved to the database', async () => {
    const blogsAtStart = await Blog.find({})
    const newBlog = {
      title: 'Test Blog',
      author: 'Test Author',
      url: 'http://test.com',
      likes: 10,
      userId
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`) // Asegúrate de incluir el token aquí
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await Blog.find({})
    expect(blogsAtEnd.length).toBe(blogsAtStart.length + 1)

    const titles = blogsAtEnd.map(b => b.title)
    expect(titles).toContain('Test Blog')
  })

  test('if likes is missing, it defaults to  0', async () => {
    const blogsAtStart = await Blog.find({})
    const newBlog = {
      title: 'Test Blog',
      author: 'Test Author',
      url: 'http://test.com',
      // No se incluye la propiedad 'likes'
      userId
    }

    const response = await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const savedBlog = response.body

    const blogsAtEnd = await Blog.find({})
    expect(blogsAtEnd.length).toBe(blogsAtStart.length + 1)

    expect(savedBlog.likes).toBe(0)
  })

  test('if title or url is missing, the backend responds with  400 Bad Request', async () => {
    const blogsAtStart = await Blog.find({})
    const newBlog = {
      author: 'Test Author',
      likes: 10,
      // No se incluyen las propiedades 'title' y 'url'
      userId
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(400)

    const blogsAtEnd = await Blog.find({})
    expect(blogsAtEnd.length).toBe(blogsAtStart.length)
  })
})

describe('when a blog is deleted', () => {
  let token
  let userId

  beforeAll(async () => {
    await User.deleteMany({})
    userId = await helper.createUser() // Obtiene el ID del usuario creado
    token = await helper.getTokenForUser(userId) // Get users ID token.
  })

  test('only the creator can delete the blog', async () => {
    const blog = {
      title: 'Test Blog',
      author: 'Test Author',
      url: 'http://test.com',
      likes: 10,
      userId
    }

    const response = await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(blog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogId = response.body.id

    // Attempt to delete the blog without providing a token
    await api
      .delete(`/api/blogs/${blogId}`)
      .expect(401)

    // Attempt to delete the blog with an invalid token
    await api
      .delete(`/api/blogs/${blogId}`)
      .set('Authorization', 'Bearer invalidtoken')
      .expect(401)

    // Attempt to delete the blog with a token from another user
    const anotherUserResponse = await api
      .post('/api/users')
      .send({ username: 'anotheruser', name: 'Another User', password: 'anotherpass' })
      .expect(201)

    const anotherUserToken = anotherUserResponse.body.token

    await api
      .delete(`/api/blogs/${blogId}`)
      .set('Authorization', `Bearer ${anotherUserToken}`)
      .expect(401)

    // Delete the blog with the correct token
    await api
      .delete(`/api/blogs/${blogId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(204)
  })
})

describe('when a blog is updated', () => {
  test('it is updated in the database', async () => {
    const blogsAtStart = await Blog.find({})
    const blogToUpdate = blogsAtStart[0]
    const updatedLikes = blogToUpdate.likes + 1

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send({ likes: updatedLikes })
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await Blog.find({})
    const updatedBlog = blogsAtEnd.find(b => b.id === blogToUpdate.id)

    expect(updatedBlog.likes).toBe(updatedLikes)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
