import { gql } from '@apollo/client';

// Get all books
const GET_BOOKS = gql`
  query GetBooks {
    books {
      name,
      id
    }
  }
`

// Get all authors
const GET_AUTHORS = gql`
  query GetAuthors {
    authors {
      name,
      id
    }
  }
`

// Mutation Query: Add a book
const ADD_BOOK = gql`
  mutation AddBook ($name: String!, $genre: String!, $authorId: ID!) {
    addBook (name: $name, genre: $genre, authorId: $authorId) {
      name,
      id,
    }
  }
`

// Get a single book by id
const GET_BOOK = gql`
  query GET_BOOK($id: ID) {
    book (id: $id) {
      id,
      name,
      genre,
      author {
        id,
        name,
        age,
        books {
          id,
          name
        }
      }
    }
  }
`

export { GET_BOOKS, GET_AUTHORS, ADD_BOOK, GET_BOOK };