import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import BookForm from '../BookForm'
import BackButton from '../Buttons/BackButton'

const apiUrl = import.meta.env.VITE_API_URL ?? ''

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
    fetch(`${apiUrl}/api/books`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(book),
    }).then(() => navigate('/'))
  }

  return (
    <div>
      <BackButton darkMode={darkMode} />
      <h1
        className={`text-3xl font-bold mb-4 ${
          darkMode ? 'text-[#f8f6ea]' : 'text-slate-700'
        }`}
      >
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
