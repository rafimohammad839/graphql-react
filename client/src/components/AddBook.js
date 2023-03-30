import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_AUTHORS, ADD_BOOK, GET_BOOKS } from '../queries/queries';

const AddBook = () => {
  const { data, loading } = useQuery(GET_AUTHORS);

  const [bookData, setBookData] = useState({ name: '', genre: '', authorId: '' });
  const [createLink] = useMutation(ADD_BOOK, {
    variables: {
      name: bookData.name,
      genre: bookData.genre,
      authorId: bookData.authorId
    },
    refetchQueries: [GET_BOOKS]
  })

  const handleChange = (e) => {
    setBookData({ ...bookData, [e.target.name]: e.target.value });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    createLink();
  }

  
  return (
    <form onSubmit={handleSubmit} id="add-book">
      
      <div className="field">
        <label>Book Name:</label>
        <input type="text" name='name' value={bookData.name} onChange={handleChange} />
      </div>

      <div className="field">
        <label>Genre:</label>
        <input type="text" name='genre' value={bookData.genre} onChange={handleChange} />
      </div>

      <div className="field">
        <label>Author:</label>
        <select name='authorId' onChange={handleChange}>
          <option>Select author</option>
          {loading && <option disabled>Loading...</option>}
          {data && data.authors.map(author => (
            <option key={author.id} value={author.id}>{author.name}</option>
          ))}
        </select>
      </div>

      <button type='submit'>+</button>
    </form>
  )
}

export default AddBook