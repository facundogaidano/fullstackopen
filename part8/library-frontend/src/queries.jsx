import { gql } from '@apollo/client'

const BOOK_DETAILS = gql`
  fragment BookDetails on Book {
    id
    title
    author
    genres
    published
  }
`

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

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`

export const ALL_GENRES = gql`
  query AllGenres {
    allGenres
  }
`

export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`
