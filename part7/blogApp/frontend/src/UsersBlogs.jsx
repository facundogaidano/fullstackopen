import { useParams } from 'react-router-dom'

const UsersBlogs = ({ users }) => {
  const id = useParams().userId
  let user = null

  if (users && id) {
    // Si las IDs son cadenas de caracteres, no necesitas convertirlas a enteros
    user = users.find(us => us.id === id)
  }

  if (!user) {
    return <div>No user found with ID {id}</div>
  }

  return (
    <div>
      <h2>{user.name}</h2>
      <div><h3>Added blogs</h3>
        <ul>
          {user.blogs.map(blog => (
            <li key={blog.id}>{blog.title}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default UsersBlogs
