import NewBlog from '../components/NewBlog'
import { Link } from 'react-router-dom'
import Table from 'react-bootstrap/Table'

const BlogList = ({ blogs, user }) => {
  const byLikes = (b1, b2) => b2.likes - b1.likes

  /*   const style = {
    marginBottom: 2,
    padding: 5,
    borderStyle: 'solid'
  } */

  return (
    <>
      <h2>Blogs</h2>
      <Table striped className='mb-3'>
        <tbody>
          {blogs && blogs.sort(byLikes).map(blog => (
            <tr key={blog.id}>
              <td>
                <Link to={`/blogs/${blog.id}`}>
                  {blog.title} {blog.author}
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {user && (
        <NewBlog />
      )}
    </>
  )
}

export default BlogList
