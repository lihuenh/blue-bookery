import React, { useState, useEffect } from 'react'
import BookList from '../BookList'

const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000'

console.log(apiUrl)

function Home({ darkMode }) {
  const [books, setBooks] = useState([])

  useEffect(() => {
    fetch(`${apiUrl}/api/books`)
      .then((response) => response.json())
      .then((data) => setBooks(data))
  }, [])

  const handleDelete = (id) => {
    fetch(`${apiUrl}/api/books/${id}`, { method: 'DELETE' }).then(() =>
      setBooks(books.filter((book) => book.id !== id))
    )
  }

  const handleEdit = (updatedBook) => {
    fetch(`${apiUrl}/api/books/${updatedBook.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedBook),
    })
      .then((response) => response.json())
      .then((data) => {
        setBooks(books.map((book) => (book.id === data.id ? data : book)))
        alert('Libro actualizado exitosamente')
      })
      .catch((error) => {
        console.error('Error al actualizar el libro:', error)
        alert('Hubo un error al actualizar el libro')
      })
  }

  return (
    <div>
      <h1 className='text-3xl font-bold mt-6 mb-6'>Book List</h1>
      <BookList
        books={books}
        onEdit={handleEdit}
        onDelete={handleDelete}
        darkMode={darkMode}
      />
    </div>
  )
}

export default Home
