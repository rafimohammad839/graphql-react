import React from 'react'
import { useQuery } from '@apollo/client';
import { GET_BOOK } from '../queries/queries';

const BookDetails = ({ bookId }) => {
  const { data, loading, error } = useQuery(GET_BOOK, {
    variables: {
      id: bookId
    }
  });
  
  if (!bookId) {
    return <div id='book-details'>No Books selected...</div>
  }

  if (error) return <p>Error: {error.message}</p>
  if (loading) return <div id='book-details'>Loading...</div>

  console.log(data);


  return (
    <div id='book-details'>
      {data && (
        <div>
          <h2>{data.book.name}</h2>
          <p>{data.book.genre}</p>
          <p>{data.book.author.name}</p>
          <p>Other books by this author:</p>
          <ul className="other-books">
            {data.book.author.books.map(book => {
              if (book.id != data.book.id) {
                return <li key={book.id}>{book.name}</li>
              }
            })}
          </ul>
        </div>
      )}
    </div>
  )
}

export default BookDetails