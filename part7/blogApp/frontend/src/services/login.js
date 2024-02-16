// import axios from 'axios'
const baseUrl = '/api/login'
// ...

const login = async credentials => {
  const response = await fetch(baseUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  })

  if (!response.ok) {
    throw new Error('Network response was not ok')
  }

  const responseData = await response.json()
  return responseData
}

export default { login }

// ...

export const getSessionToken = () => {
  return window.localStorage.getItem('sessionToken')
}
