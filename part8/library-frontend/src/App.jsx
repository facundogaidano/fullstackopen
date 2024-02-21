import { useEffect, useState } from 'react'
import { useApolloClient, useQuery } from '@apollo/client'

import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import Notify from './components/Notify'

import { ALL_BOOKS, ALL_AUTHORS } from './queries'

const App = () => {
  const [token, setToken] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [page, setPage] = useState('authors')

  const { data: booksData, loading: booksLoading } = useQuery(ALL_BOOKS)
  const { data: authorsData, loading: authorsLoading } = useQuery(ALL_AUTHORS)
  const client = useApolloClient()

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }

  useEffect(() => {
    const tokenFromStorage = window.localStorage.getItem('library-user-token')
    if (tokenFromStorage) {
      setToken(tokenFromStorage)
    }
  }, [])

  const logout = () => {
    setToken(null)
    window.localStorage.clear()
    client.resetStore()
  }

  return (
    <div>
      <div>
        {token
          ? (
            <>
              <button onClick={() => setPage('authors')}>authors</button>
              <button onClick={() => setPage('books')}>books</button>
              <button onClick={() => setPage('add')}>add book</button>
              <button onClick={logout}>logout</button>
              <Notify errorMessage={errorMessage} />
            </>
            )
          : (
            <>
              <button onClick={() => setPage('authors')}>authors</button>
              <button onClick={() => setPage('books')}>books</button>
              <button onClick={() => setPage('login')}>login</button>
              <Notify errorMessage={errorMessage} />
              {page === 'login' && <LoginForm setToken={setToken} setError={notify} />}
            </>
            )}
      </div>
      <Notify errorMessage={errorMessage} />
      {authorsLoading
        ? <p>Loading...</p>
        : <Authors authors={authorsData?.allAuthors} setError={notify} show={page === 'authors'} />}

      <NewBook show={page === 'add'} />

      {booksLoading
        ? <p>Loading...</p>
        : <Books books={booksData?.allBooks} show={page === 'books'} />}
    </div>
  )
}

export { ALL_BOOKS, ALL_AUTHORS }

export default App
