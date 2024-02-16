// src/services/blogs.js
import storageService from '../services/storage'
const baseUrl = '/api/blogs'

// Asegúrate de que el token se esté obteniendo correctamente del almacenamiento
const token = storageService.loadUser() ? storageService.loadUser().token : null

const headers = {
  Authorization: token ? `Bearer ${token}` : null
}

const getAll = async () => {
  const response = await fetch(baseUrl, { headers })
  if (!response.ok) {
    throw new Error('Network response was not ok')
  }
  return response.json()
}

const create = async (object) => {
  const response = await fetch(baseUrl, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(object)
  })
  if (!response.ok) {
    throw new Error('Network response was not ok')
  }
  return response.json()
}

const update = async (object) => {
  const response = await fetch(`${baseUrl}/${object.id}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(object)
  })
  if (!response.ok) {
    throw new Error('Network response was not ok')
  }
  return response.json()
}

const remove = async (id) => {
  const response = await fetch(`${baseUrl}/${id}`, {
    method: 'DELETE',
    headers
  })
  if (!response.ok) {
    throw new Error('Network response was not ok')
  }
}

export default { getAll, create, update, remove }
