import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'

const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000'

function BookDetails({ darkMode }) {
  const { id } = useParams()
  const [book, setBook] = useState(null)

  useEffect(() => {
    fetch(`${apiUrl}/api/books/${id}`)
      .then((response) => response.json())
      .then((data) => setBook(data))
  }, [id])

  if (!book) return <p>Loading...</p>

  return (
    <>
      <div
        className={`mt-2 transition-all duration-500 mt-6 ${
          darkMode ? ' text-white' : 'text-black'
        }`}
      >
        <h1
          className={`text-3xl font-semibold ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}
        >
          Book Details
        </h1>
      </div>
      <div
        className={`max-w-3xl mx-auto rounded-lg shadow-xl transition-all duration-500 mt-4 ${
          darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-700'
        }`}
      >
        <img
          className='rounded-t-lg object-cover w-full' // Ajusta el tamaño de la imagen
          src={
            book.image ||
            'https://img.freepik.com/free-vector/glitch-error-404-page_23-2148105404.jpg'
          }
          alt={book.title}
        />
        <div className='p-6'>
          <h1 className='text-3xl font-bold mt-4'>{book.title}</h1>
          <p className='mt-1'>{`by: ${book.author}`}</p>
          <p className='mt-3'>Year: {book.year}</p>
          <p className='mt-1'>Publisher: {book.publisher}</p>
          <p className='mt-1'>Uploaded by: {book.uploaded_by}</p>
          <p className='mt-1'>Date Uploaded: {book.upload_date}</p>
          <p className='mt-1'>Last Updated: {book.last_modified}</p>
        </div>
      </div>
      <Link
        to='/'
        className='mt-4 w-full inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 text-center'
      >
        Back to List
      </Link>
    </>
  )
}

export default BookDetails
