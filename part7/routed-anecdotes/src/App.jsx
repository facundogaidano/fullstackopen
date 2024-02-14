import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Menu from './components/Menu'
import AnecdoteList from './components/AnecdoteList'
import Anecdote from './components/Anecdote'
import About from './components/About'
import CreateNew from './components/CreateNew'
import Footer from './components/Footer'

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2
    }
  ])

  const [notification, setNotification] = useState('')
  const [showNotification, setShowNotification] = useState(false)

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000)
    setAnecdotes(anecdotes.concat(anecdote))
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  return (
    <div>
      {showNotification && <div>{notification}</div>}
      <Menu />
      <Routes>
        <Route path='/' element={<AnecdoteList anecdotes={anecdotes} />} />
        <Route path='/anecdotes/:anecdoteId' element={<Anecdote anecdotes={anecdotes} />} />
        <Route path='/about' element={<About />} />
        <Route path='/create' element={<CreateNew addNew={addNew} setNotification={setNotification} setShowNotification={setShowNotification} />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
