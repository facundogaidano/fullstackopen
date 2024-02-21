import { useQuery } from '@apollo/client'
import { ALL_GENRES } from '../queries'
import { useEffect, useState } from 'react'

const Books = ({ show, books }) => {
  const [selectedGenre, setSelectedGenre] = useState('')
  const { data: genresData, loading: genresLoading, error: genresError } = useQuery(ALL_GENRES)

  useEffect(() => {
    if (genresError) {
      console.error('Error fetching genres:', genresError)
    }
  }, [genresError])

  if (!show) {
    return null
  }

  return (
    <div>
      <h2>books</h2>

      <div>
        {genresLoading
          ? (
            <p>Loading genres...</p>
            )
          : genresData
            ? (
              <div>
                {genresData.allGenres.map((genre) => (
                  <button key={genre} onClick={() => setSelectedGenre(genre)}>
                    {genre}
                  </button>
                ))}
              </div>
              )
            : (
              <p>No genres found.</p>
              )}
      </div>

      <table>
        <tbody>
          <tr>
            <th />
            <th>author</th>
            <th>published</th>
          </tr>
          {books.filter(book => !selectedGenre || book.genres.includes(selectedGenre))
            .map((book) => (
              <tr key={book.id}>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.published}</td>
                <td>{book.genres.join(', ')}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  )
}

export { ALL_GENRES }

export default Books
