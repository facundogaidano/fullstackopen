import { Link } from 'react-router-dom'

const Menu = () => {
  const padding = {
    paddingRight: 5
  }
  return (
    <header>
      <h1>Software anecdotes</h1>
      <Link style={padding} to='/'>anecdotes</Link>
      <Link style={padding} to='/create'>create new</Link>
      <Link style={padding} to='/about'>about</Link>
    </header>
  )
}

export default Menu
