import React from 'react'
import BookCard from './BookCard'

function BookList({ books, onDelete, onEdit, darkMode }) {
  return (
    <div className='grid grid-cols-auto-fit gap-4 lg:gap-6 justify-center mt-2'>
      {books.map((book) => (
        <BookCard
          key={book.id}
          book={book}
          onDelete={onDelete}
          onEdit={onEdit}
          darkMode={darkMode}
        />
      ))}
    </div>
  )
}

export default BookList
