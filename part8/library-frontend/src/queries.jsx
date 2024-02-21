import { gql } from '@apollo/client'

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
