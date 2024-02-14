import { useNavigate } from 'react-router-dom'
import useField from '../hooks/useField'

const CreateNew = ({ addNew, setNotification, setShowNotification }) => {
  const navigate = useNavigate()
  const contentField = useField('text')
  const authorField = useField('text')
  const infoField = useField('url')

  const handleReset = () => {
    contentField.reset()
    authorField.reset()
    infoField.reset()
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const newAnecdote = {
      content: contentField.value,
      author: authorField.value,
      info: infoField.value,
      votes: 0
    }
    addNew(newAnecdote)
    setNotification(`a new anecdote ${contentField.value} created!`)
    setShowNotification(true)
    setTimeout(() => {
      setNotification('')
      setShowNotification(false)
    }, 5000)

    navigate('/')
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input
            value={contentField.value}
            type={contentField.type}
            onChange={contentField.handleChange}
          />
        </div>
        <div>
          author
          <input
            value={authorField.value}
            type={authorField.type}
            onChange={authorField.handleChange}
          />
        </div>
        <div>
          url for more info
          <input
            value={infoField.value}
            type={infoField.type}
            onChange={infoField.handleChange}
          />
        </div>
        <button type='submit'>create</button>
        <button type='button' onClick={handleReset}>clear</button>
      </form>
    </div>
  )
}

export default CreateNew
