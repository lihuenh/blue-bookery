import React from 'react'
import { Link } from 'react-router-dom'

function BookCard({ book, onDelete, darkMode }) {
  return (
    <div
      className={`flex flex-col h-[500px] rounded-lg shadow-lg overflow-hidden transition-all duration-700 
      ${darkMode ? 'bg-gray-700 text-gray-200' : 'bg-gray-100 text-gray-700'}`}
    >
      <Link to={`/edit-book/${book.id}`} className='h-[60%]'>
        <img
          className='h-full w-full object-cover'
          src={
            book.image && book.image !== ''
              ? book.image
              : 'https://img.freepik.com/free-vector/glitch-error-404-page_23-2148105404.jpg'
          }
          alt={book.title}
        />
      </Link>

      <div className='h-[40%] p-4 flex flex-col justify-between'>
        <div>
          <h3 className='text-lg font-semibold'>{book.title}</h3>
          <p className='text-sm'>{book.author}</p>
          <p className='text-sm'>Year: {book.year}</p>
        </div>

        <div className='flex justify-between'>
          <Link
            to={`/book/${book.id}`}
            className='bg-blue-500 text-white p-2 rounded hover:bg-blue-600'
          >
            View Details
          </Link>

          <button
            onClick={() => onDelete(book.id)}
            className='bg-red-500 text-white p-2 rounded hover:bg-red-600'
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}

export default BookCard
