const AnecdoteFilter = ({ onFilterChange }) => {
  const style = {
    marginBottom: 10
  }
  return (
    <div style={style}>
      filter <input name='filter' onChange={onFilterChange} />
    </div>
  )
}

export default AnecdoteFilter
