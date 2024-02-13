import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setFilter } from '../reducers/filterReducer'
import { setNotification } from '../reducers/notificationReducer'
import AnecdoteFilter from './AnecdoteFilter'
import Notification from './Notification'

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => state.anecdotes)
  const filter = useSelector(state => state.filter)

  const vote = (id, content) => {
    dispatch(voteAnecdote({ id }))
    dispatch(setNotification(`You voted for "${content}" !`, 5))
  }

  const sortedAnecdotes = [...anecdotes].sort((a, b) => b.votes - a.votes)

  const filteredAnecdotes = sortedAnecdotes.filter(anecdote =>
    anecdote && anecdote.content && anecdote.content.includes(filter)
  )

  const handleFilterChange = (event) => {
    dispatch(setFilter(event.target.value))
  }

  return (
    <>
      <h2>Anecdotes</h2>
      <Notification />
      <AnecdoteFilter onFilterChange={handleFilterChange} />
      {filteredAnecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
          </div>
        </div>
      )}
    </>
  )
}

export default AnecdoteList
