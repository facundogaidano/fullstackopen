import { useParams } from 'react-router-dom'

const Anecdote = ({ anecdotes }) => {
  const id = useParams().anecdoteId
  const anecdote = anecdotes.find(an => an.id === Number(id))
  return (
    <div>
      <h2>{anecdote.content} by {anecdote.author}</h2>
      <div>has {anecdote.votes} votes</div>
      <div>for more info see <a href={`${anecdote.info}`} target='_blank' rel='noreferrer'>{anecdote.info}</a></div>
    </div>
  )
}

export default Anecdote
