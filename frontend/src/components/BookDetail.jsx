import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'

function BookDetail() {
  const { id } = useParams()
  const [book, setBook] = useState(null)

  useEffect(() => {
    fetch(`http://localhost:5000/api/books/${id}`)
      .then((response) => response.json())
      .then((data) => setBook(data))
  }, [id])

  if (!book) return <p>Loading...</p>

  return (
    <div className='max-w-3xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-xl'>
      <img
        className='w-full h-64 object-cover rounded-lg'
        src={
          book.image ||
          'https://img.freepik.com/free-vector/glitch-error-404-page_23-2148105404.jpg'
        }
        alt={book.title}
      />
      <h2 className='text-2xl font-bold mt-4'>{book.title}</h2>
      <p className='text-gray-700 dark:text-gray-300'>by {book.author}</p>
      <p className='text-gray-700 dark:text-gray-300'>Year: {book.year}</p>
      <p className='text-gray-700 dark:text-gray-300'>
        Publisher: {book.publisher}
      </p>
      <p className='text-gray-700 dark:text-gray-300'>
        Uploaded by: {book.uploaded_by}
      </p>
      <p className='text-gray-700 dark:text-gray-300'>
        Last Updated: {book.updatedAt}
      </p>

      <Link
        to='/'
        className='mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'
      >
        Back to List
      </Link>
    </div>
  )
}

export default BookDetail
