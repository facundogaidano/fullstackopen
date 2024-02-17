import axios from 'axios'
import storageService from './services/storage'

const baseUrl = 'http://localhost:3003/api/blogs'

// Función para recuperar el token del almacenamiento local
function getToken () {
  const user = storageService.loadUser()
  return user ? user.token : null
}

export const getBlogs = () => {
  return axios.get(baseUrl).then(res => res.data)
}

export const addComment = async (blogId, content) => {
  const user = storageService.loadUser()
  const token = user ? user.token : null
  if (!token) {
    console.error('No token found')
    return Promise.reject(new Error('No token found'))
  }
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  }
  const response = await axios.post(`${baseUrl}/${blogId}/comments`, { content }, config)
  return response.data
}

export const createBlog = newAnecdote => {
  const user = storageService.loadUser()
  const token = user ? user.token : null
  if (!token) {
    console.error('No token found')
    return Promise.reject(new Error('No token found'))
  }
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  }
  return axios.post(baseUrl, newAnecdote, config).then(res => res.data)
}

export const deleteBlog = id => {
  const token = getToken()
  if (!token) {
    // Manejar el caso en que el token no esté presente
    console.error('No token found')
    return Promise.reject(new Error('No token found'))
  }
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  }
  return axios.delete(`${baseUrl}/${id}`, config)
}

export const updateLike = updatedVote => {
  const voteIncremented = { ...updatedVote, likes: updatedVote.likes + 1 }
  return axios.put(`${baseUrl}/${voteIncremented.id}`, voteIncremented).then(res => res.data)
}

export const getUsers = async () => {
  const response = await fetch('api/users')
  if (!response.ok) {
    throw new Error('Error fetching users')
  }
  return response.json()
}
