import React from 'react'
import { Link } from 'react-router-dom'

function BookCard({ book, onDelete, darkMode }) {
  return (
    <div
      className={`rounded-lg shadow-lg overflow-hidden transition-all duration-400 ${
        darkMode ? 'bg-gray-700 ' : 'bg-gray-100'
      }`}
    >
      <Link
        to={`/edit-book/${book.id}`} // Redirigir a la página de edición
      >
        <img
          className='rounded-t-lg object-cover w-full h-48'
          src={
            book.image && book.image !== ''
              ? book.image
              : 'https://img.freepik.com/free-vector/glitch-error-404-page_23-2148105404.jpg'
          }
          alt={book.title}
        />
      </Link>
      <div className={`p-4 ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
        <h3 className='text-xl font-semibold'>{book.title}</h3>
        <p className={`${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>
          by {book.author}
        </p>
        <p className={`${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>
          Year: {book.year}
        </p>

        <div className='mt-4 flex justify-between'>
          <Link
            to={`/book/${book.id}`} // Asegúrate de que 'book.id' esté correcto
            className={`${
              darkMode ? 'bg-blue-600' : 'bg-blue-500'
            } text-white p-2 rounded hover:bg-blue-600`}
          >
            View Details
          </Link>

          <button
            onClick={() => onDelete(book.id)} // Asegúrate de que `onDelete` está correctamente pasado como prop
            className={`${
              darkMode ? 'bg-red-600' : 'bg-red-500'
            } text-white p-2 rounded hover:bg-red-600`}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}

export default BookCard
