const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/bloglist')

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
  test('it is saved to the database', async () => {
    const blogsAtStart = await Blog.find({})
    const newBlog = {
      title: 'Test Blog',
      author: 'Test Author',
      url: 'http://test.com',
      likes: 10
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await Blog.find({})
    expect(blogsAtEnd.length).toBe(blogsAtStart.length + 1)

    const titles = blogsAtEnd.map(b => b.title)
    expect(titles).toContain('Test Blog')
  })
})
describe('when a new blog is created', () => {
  test('it is saved to the database', async () => {
    const blogsAtStart = await Blog.find({})
    const newBlog = {
      title: 'Test Blog',
      author: 'Test Author',
      url: 'http://test.com',
      likes: 10
    }

    await api
      .post('/api/blogs')
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
      url: 'http://test.com'
      // No se incluye la propiedad 'likes'
    }

    const response = await api
      .post('/api/blogs')
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
      likes: 10
      // No se incluyen las propiedades 'title' y 'url'
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)

    const blogsAtEnd = await Blog.find({})
    expect(blogsAtEnd.length).toBe(blogsAtStart.length)
  })
})

describe('when a blog is deleted', () => {
  test('it is removed from the database', async () => {
    const blogsAtStart = await Blog.find({})
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    const blogsAtEnd = await Blog.find({})
    const titles = blogsAtEnd.map(b => b.title)

    expect(titles).not.toContain(blogToDelete.title)
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