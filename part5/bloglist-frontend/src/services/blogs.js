import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getBlog = async (id) => {
  const config = {
    headers: {
      Authorization: token
    }
  }

  try {
    const response = await axios.get(`${baseUrl}/${id}`, config)
    return response.data
  } catch (error) {
    console.error('Error fetching blog:', error)
    throw error
  }
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newObject => {
  const config = {
    headers: { Authorization: `${token}` }
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}

const deleteBlog = async (id) => {
  const config = {
    headers: { Authorization: `${token}` }
  }

  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response.data
}

const addLike = async (blog) => {
  const config = {
    headers: {
      Authorization: token,
      'Content-Transfer-Encoding': 'application/json'
    }
  }

  try {
    const response = await axios.put(baseUrl + `/${blog.id}`, blog, config)
    return response.data
  } catch (error) {
    console.log('Error', error)
    throw error
  }
}

export default { getAll, getBlog, deleteBlog, create, update, setToken, addLike }
