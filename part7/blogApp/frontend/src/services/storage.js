const KEY = 'bloggappUser'

const saveUser = (user) => {
  window.localStorage.setItem(KEY, JSON.stringify(user))
}

const loadUser = () => {
  return JSON.parse(window.localStorage.getItem(KEY))
}

const removeUser = () => {
  window.localStorage.removeItem(KEY)
}

export default {
  saveUser, loadUser, removeUser
}
