import { useState } from 'react'
import { gql, useMutation } from '@apollo/client'
import Select from 'react-select'
import { ALL_AUTHORS, ALL_BOOKS } from '../App'

const EDIT_AUTHOR = gql`
mutation EditAuthor($name: String!, $bornTo: Int!) {
  editAuthor(name: $name, setBornTo: $bornTo) {
    bookCount
    born
    id
    name
  }
}
`

const Authors = ({ show, authors }) => {
  const [name, setName] = useState('')
  const [bornTo, setBornTo] = useState('')

  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }, { query: ALL_BOOKS }]
  })

  if (!show) {
    return null
  }

  const authorOptions = authors.map(author => ({
    value: author.id,
    label: author.name
  }))

  const handleAuthorSelection = (selectedOption) => {
    setName(selectedOption.label)
    setBornTo(selectedOption.value)
  }

  const submit = async (event) => {
    event.preventDefault()

    editAuthor({ variables: { name, bornTo } })

    setBornTo('')
    setName('')
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th />
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <h2>Set birthyear</h2>
        <form onSubmit={submit}>
          <div>
            <Select
              options={authorOptions}
              onChange={handleAuthorSelection}
            />
          </div>
          <div>
            born <input type='number' value={bornTo} onChange={({ target }) => setBornTo(parseInt(target.value, 10))} />
            <button type='submit'>edit author</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Authors
