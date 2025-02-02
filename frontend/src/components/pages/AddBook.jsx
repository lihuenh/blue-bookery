import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import BookForm from '../BookForm'

function AddBook({ darkMode }) {
  const [book, setBook] = useState({
    title: '',
    author: '',
    year: '',
    publisher: '',
    image: '',
    user: '',
  })
  const navigate = useNavigate()

  const handleSubmit = () => {
    fetch('http://localhost:5000/api/books', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(book),
    }).then(() => navigate('/'))
  }

  return (
    <div>
      <h1 className='text-3xl font-bold mb-6 transition-all duration-500'>
        Add a Book
      </h1>
      <BookForm
        book={book}
        setBook={setBook}
        onSubmit={handleSubmit}
        darkMode={darkMode}
      />
    </div>
  )
}

export default AddBook
