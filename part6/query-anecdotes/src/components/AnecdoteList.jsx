import React, { useContext } from 'react'
import { useQueryClient, useMutation, useQuery } from '@tanstack/react-query'
import { updateVote, getAnecdotes } from '../requests'
import { NotificationContext } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: 1
  })
  const anecdotes = result.data
  const queryClient = useQueryClient()
  const { dispatch } = useContext(NotificationContext)

  const addVote = useMutation({
    mutationFn: updateVote,
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes')
    }
  })

  const handleVote = async (anecdote) => {
    await addVote.mutateAsync(anecdote)
    dispatch({
      type: 'SHOW_NOTIFICATION',
      message: `Anecdote '${anecdote.content}' voted`
    })
    setTimeout(() => {
      dispatch({ type: 'CLEAR_NOTIFICATION' })
    }, 5000)
  }

  return (
    <>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </>
  )
}

export default AnecdoteList
