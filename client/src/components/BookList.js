import React, { useState } from 'react'
import { useQuery } from '@apollo/client';
import { GET_BOOKS } from '../queries/queries';
import BookDetails from './BookDetails';

const BookList = () => {
  const { data, loading, error } = useQuery(GET_BOOKS);
  const [bookId, setBookId] = useState(null);

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error...{error.message}</p>
  
  return (
    <div>
      <ul id='book-list'>
        {data?.books?.map(book => (
          <li key={book.id} onClick={(e) => setBookId(book.id)}>{book.name}</li>
        ))}
      </ul>
      <BookDetails bookId={bookId} />
    </div>
  )
}

export default BookList