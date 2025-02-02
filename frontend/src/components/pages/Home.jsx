import React, { useState, useEffect } from 'react'
import BookList from '../BookList'

function Home({ darkMode }) {
  const [books, setBooks] = useState([])

  useEffect(() => {
    fetch('http://localhost:5000/api/books')
      .then((response) => response.json())
      .then((data) => setBooks(data))
  }, [])

  const handleDelete = (id) => {
    fetch(`http://localhost:5000/api/books/${id}`, { method: 'DELETE' }).then(
      () => setBooks(books.filter((book) => book.id !== id))
    )
  }

  const handleEdit = (updatedBook) => {
    fetch(`http://localhost:5000/api/books/${updatedBook.id}`, {
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
      <h1 className='text-3xl font-bold mt-3 mb-6'>Book List</h1>
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
