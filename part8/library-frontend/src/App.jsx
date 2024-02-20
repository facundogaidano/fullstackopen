import { useState } from 'react'
import { gql, useQuery } from '@apollo/client'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'

export const ALL_BOOKS = gql`
  query {
    allBooks {
      author
      genres
      id
      published
      title
    }
  }
`

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
    }
  }
`

const App = () => {
  const [page, setPage] = useState('authors')

  const { data: booksData, loading: booksLoading } = useQuery(ALL_BOOKS)
  const { data: authorsData, loading: authorsLoading } = useQuery(ALL_AUTHORS)

  console.log(booksData)
  console.log(authorsData)

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
      </div>

      {authorsLoading
        ? <p>Loading...</p>
        : <Authors authors={authorsData?.allAuthors} show={page === 'authors'} />}

      <NewBook show={page === 'add'} />

      {booksLoading
        ? <p>Loading...</p>
        : <Books books={booksData?.allBooks} show={page === 'books'} />}
    </div>
  )
}

export default App
