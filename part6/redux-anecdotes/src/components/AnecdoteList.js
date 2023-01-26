import { useDispatch, useSelector } from 'react-redux'
import { incrementVote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const Anecdote = ({ anecdote, handleClick }) => {
  return (
    <div>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes}
        <button onClick={handleClick}>vote</button>
      </div>
    </div>
  )
}

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const byVotes = (a1, a2) => a2.votes > a1.votes ? 1 : -1
  const anecdotes = useSelector(({ filter, anecdotes }) => {
    if (!filter) {
      return [...anecdotes].sort(byVotes)
    }
    return anecdotes.filter(anecdote => anecdote.content.includes(filter)).sort(byVotes)
  })

  return (
    <div>
      {anecdotes.map(anecdote =>
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleClick={() => {
            dispatch(incrementVote(anecdote))
            dispatch(setNotification(`you voted '${anecdote.content}'`, 5))
          }}
          />
        )}
    </div>
  )
}

export default AnecdoteList