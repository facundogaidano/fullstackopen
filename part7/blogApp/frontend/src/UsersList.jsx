import { Link } from 'react-router-dom'
import Table from 'react-bootstrap/Table'

const UsersList = ({ users }) => {
  return (
    <>
      <h2>Users</h2>
      <Table striped>
        <thead>
          <tr>
            <th />
            <th>Blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td><Link to={`/users/${user.id}`}>{user.name}</Link></td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  )
}

export default UsersList
