import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import BookForm from '../BookForm'

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
      <div className=' justify-between items-center sticky top-0 pb-4'>
        <Link
          to='/'
          className='w-28 h-8 bg-blue-700 text-white rounded hover:bg-blue-600 flex items-center justify-center text-sm font-semibold'
        >
          ← Back
        </Link>
      </div>
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
