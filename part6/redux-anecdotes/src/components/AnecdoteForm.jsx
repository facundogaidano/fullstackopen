import { useDispatch } from 'react-redux'
import { createAnecdotes } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.note.value
    event.target.note.value = ''
    dispatch(createAnecdotes(content))
    dispatch(setNotification(`You added "${content}"!`, 5))
  }

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <input name='note' />
        <button type='submit'>add</button>
      </form>
    </>
  )
}

export default AnecdoteForm
