import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'
import jwt from 'jsonwebtoken'
import { GraphQLError } from 'graphql'
import mongoose from 'mongoose'
import Book from './models/book.js'
import Author from './models/author.js'
import User from './models/user.js'

import dotenv from 'dotenv'
dotenv.config()

const MONGODB_URI = process.env.MONGODB_URI

console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

const typeDefs = `
  type Author {
    name: String!
    born: Int
    id: ID!
    bookCount: Int
  }

  type Book {
    title: String!
    published: Int
    author: String!
    id: ID!
    genres: [String!]
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book]
    allAuthors: [Author!]
    me: User
  }

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Mutation {
    addBook (
      title: String!
      author: String!
      published: Int
      genres: [String!]
    ): Book

    editAuthor(name: String!, setBornTo: Int!): Author

    createUser(
      username: String!
      favoriteGenre: String!
    ): User

    login(
      username: String!
      password: String!
    ): Token
  }
`

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      const { author, genre } = args
      const query = {}

      if (author) {
        // Find the author by name and get the ObjectId
        const authorDoc = await Author.findOne({ name: author })
        if (authorDoc) {
          query.author = authorDoc._id
        } else {
          // If the author is not found, return an empty array
          return []
        }
      }
      if (genre) {
        query.genres = genre
      }

      // Fetch the books with their author's name
      const books = await Book.find(query).populate('author')
      return books.map(book => ({
        ...book._doc,
        id: book._id.toString(),
        author: book.author.name // Assuming the author field is populated with the author's name
      }))
    },
    allAuthors: async () => {
      const authors = await Author.find({})
      const authorsWithBookCount = await Promise.all(authors.map(async (author) => {
        const bookCount = await Book.countDocuments({ author: author._id })
        return {
          ...author._doc,
          id: author._id.toString(),
          bookCount
        }
      }))
      return authorsWithBookCount
    },
    me: (root, args, context) => {
      return context.currentUser
    }
  },
  Mutation: {
    addBook: async (root, args, context) => {
      if (!context.currentUser) {
        throw new GraphQLError('You must be logged in to add a book', {
          extensions: {
            code: 'UNAUTHENTICATED'
          }
        })
      }
      let author = await Author.findOne({ name: args.author })
      if (!author) {
        author = new Author({ name: args.author })
        await author.save()
      }
      const book = new Book({ ...args, author: author._id })
      const savedBook = await book.save()

      const bookWithAuthorName = await Book.findById(savedBook._id).populate('author')
      return {
        ...bookWithAuthorName._doc,
        author: bookWithAuthorName.author.name
      }
    },

    editAuthor: async (root, args, context) => {
      if (!context.currentUser) {
        throw new GraphQLError('You must be logged in to add a book', {
          extensions: {
            code: 'UNAUTHENTICATED'
          }
        })
      }
      const author = await Author.findOne({ name: args.name })
      if (!author) {
        throw new Error('Author not found')
      }

      // Update the author's born field
      author.born = args.setBornTo
      await author.save()

      // Calculate the updated book count for the author
      const bookCount = await Book.countDocuments({ author: author._id })

      // Return the updated author with the new book count
      return {
        ...author._doc,
        bookCount
      }
    },

    createUser: async (root, args) => {
      const user = new User({
        username: args.username,
        favoriteGenre: args.favoriteGenre // Make sure this is provided in the args
      })

      try {
        const savedUser = await user.save()
        return savedUser
      } catch (error) {
        console.error('Error creating user:', error)
        throw new Error('Creating the user failed')
      }
    },

    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if (!user || args.password !== 'secret') {
        throw new GraphQLError('wrong credentials', {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        })
      }

      const userForToken = {
        username: user.username,
        id: user._id
      }

      return { value: jwt.sign(userForToken, process.env.SECRET) }
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers
})

startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async ({ req, res }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.startsWith('Bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), process.env.SECRET
      )
      const currentUser = await User
        .findById(decodedToken.id).populate('favoriteGenre')
      return { currentUser }
    }
  }
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
