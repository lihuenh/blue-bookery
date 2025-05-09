import React, { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'

const apiUrl = import.meta.env.VITE_API_URL ?? ''

function BookDetails({ darkMode }) {
  const { id } = useParams()
  const navigate = useNavigate()
  const [book, setBook] = useState(null)
  const [showConfirm, setShowConfirm] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [showFullDescription, setShowFullDescription] = useState(false)

  // useEffect(() => {
  //   fetch(`${apiUrl}/api/books/${id}`)
  //     .then((response) => response.json())
  //     .then((data) => setBook(data))
  // }, [id])

  useEffect(() => {
    fetch(`${apiUrl}/api/books/${id}`)
      .then((response) => response.json())
      .then((data) => {
        // Agregamos una descripción si no viene
        if (!data.description) {
          data.description =
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. '
        }
        setBook(data)
      })
      .catch((error) => {
        console.error('Error fetching book:', error)
      })
  }, [id])

  if (!book) return <p>Loading...</p>

  const handleDelete = async () => {
    try {
      setDeleting(true)
      const res = await fetch(`${apiUrl}/api/books/${book.id}`, {
        method: 'DELETE',
      })
      if (res.ok) {
        navigate('/')
      } else {
        alert('No se pudo eliminar el libro')
      }
    } catch (error) {
      alert('Error de red o servidor')
    } finally {
      setDeleting(false)
      setShowConfirm(false)
    }
  }

  const truncateDescription = (text, maxLength) => {
    if (text.length <= maxLength) return text
    return text.slice(0, maxLength) + '...'
  }

  return (
    <>
      {/* Botón de regreso en pantallas grandes */}
      <div className='md:flex justify-between items-center sticky top-0 pb-4'>
        <Link
          to='/'
          className='w-28 h-8 bg-blue-700 text-white rounded-full hover:bg-blue-600 flex items-center justify-center text-sm font-semibold'
        >
          ← Back
        </Link>
      </div>

      {/* Título */}
      <div
        className={`transition-all duration-500 ${
          darkMode ? 'text-white' : 'text-black'
        }`}
      >
        <h1
          className={`text-3xl font-bold mb-4 ${
            darkMode ? 'text-[#f8f6ea]' : 'text-slate-700'
          }`}
        >
          Book Details
        </h1>
      </div>

      {/* Contenido principal */}
      <div
        className={`mt-4 transition-all duration-500 flex flex-col md:flex-row ${
          darkMode ? 'text-white' : 'text-gray-700'
        } w-full`}
      >
        {/* Imagen y botones */}
        <div className='md:w-[350px] flex flex-col items-center'>
          <img
            className='w-[350px] max-h-[600px] object-cover rounded-r-xl shadow-md'
            src={
              book.image ||
              'https://img.freepik.com/free-vector/glitch-error-404-page_23-2148105404.jpg'
            }
            alt={book.title}
          />
          <div className='hidden md:flex gap-2 w-full mt-4'>
            <Link
              to={`/edit-book/${book.id}`}
              className='w-full h-10 bg-yellow-500 text-white rounded-full hover:bg-yellow-400 flex items-center justify-center text-md font-semibold'
            >
              Edit
            </Link>
            <button
              onClick={() => setShowConfirm(true)}
              className='w-full h-10 bg-red-600 text-white rounded-full hover:bg-red-500 flex items-center justify-center text-md font-semibold'
            >
              Delete
            </button>
          </div>
        </div>

        {/* Botones en móviles */}
        <div className='mt-4 flex flex-col md:hidden gap-2'>
          <div className='flex gap-2'>
            <Link
              to={`/edit-book/${book.id}`}
              className='w-full h-10 bg-yellow-500 text-white rounded-full hover:bg-yellow-400 flex items-center justify-center text-md font-semibold'
            >
              Edit
            </Link>
            <button
              onClick={() => setShowConfirm(true)}
              className='w-full h-10 bg-red-600 text-white rounded-full hover:bg-red-500 flex items-center justify-center text-md font-semibold'
            >
              Delete
            </button>
          </div>
        </div>

        {/* Detalles del libro */}
        <div className='flex-1 md:ml-6 mt-6 md:mt-0 md:overflow-y-auto md:max-h-[calc(100vh-280px)] md:min-h-[600px]'>
          <h1 className='text-3xl font-bold mb-1'>{book.title}</h1>
          <p className='mb-3 text-lg font-medium'>{book.author}</p>
          <p className='mb-1'>Year: {book.year}</p>
          <p className='mb-1'>Publisher: {book.publisher}</p>
          <p className='mb-1'>Uploaded by: {book.uploaded_by}</p>
          <p className='mb-1'>Date Uploaded: {book.upload_date}</p>
          <p className='mb-1'>Last Updated: {book.last_modified}</p>
          <p className='text-sm text-balance'>
            {showFullDescription
              ? book.description
              : truncateDescription(book.description, 100)}
            {book.description.length > 100 && (
              <button
                onClick={() => setShowFullDescription(!showFullDescription)}
                className='text-blue-500 ml-2 '
              >
                {showFullDescription ? 'Show less' : 'Show more '}
              </button>
            )}
          </p>
        </div>
      </div>

      {/* Modal de confirmación */}
      {showConfirm && (
        <div
          className={`relative z-20`}
          aria-labelledby='modal-title'
          role='dialog'
          aria-modal='true'
          onClick={() => setShowConfirm(false)}
        >
          {/* Fondo con transición */}
          <div
            className='fixed inset-0 bg-black/75 transition-opacity'
            aria-hidden='true'
          />

          <div className='fixed inset-0 z-50 w-screen overflow-y-auto'>
            <div className='flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0'>
              {/* Panel del modal */}
              <div
                className={`relative transform overflow-hidden rounded-lg ${
                  darkMode
                    ? 'bg-gray-800  text-white'
                    : ' text-gray-700 bg-white'
                } shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg`}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Botón de cierre */}
                <button
                  onClick={() => setShowConfirm(false)}
                  className={`absolute top-3 right-3 ${
                    darkMode
                      ? 'text-gray-300  hover:text-white'
                      : 'text-gray-400  hover:text-gray-600'
                  }`}
                  aria-label='Cerrar'
                >
                  <svg
                    className='w-6 h-6'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M6 18L18 6M6 6l12 12'
                    />
                  </svg>
                </button>

                <div className='px-4 pt-5 pb-4 sm:p-6 sm:pb-4'>
                  <div className='sm:flex sm:items-start'>
                    {/* Ícono */}
                    <div className='mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10'>
                      <svg
                        className='h-6 w-6 text-red-600'
                        fill='none'
                        viewBox='0 0 24 24'
                        strokeWidth={1.5}
                        stroke='currentColor'
                        aria-hidden='true'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          d='M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z'
                        />
                      </svg>
                    </div>
                    <div className='mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left'>
                      <h3
                        className={`text-lg font-semibold
                          ${darkMode ? ' text-white' : ' text-gray-700 '}
                          `}
                        id='modal-title'
                      >
                        Confirm deletion
                      </h3>
                      <div className='mt-2'>
                        <p
                          className={`text-sm ${
                            darkMode ? 'text-gray-300' : ' text-gray-500'
                          }`}
                        >
                          Are you sure you want to delete{' '}
                          <strong>{book.title}</strong>? This action cannot be
                          undone.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className={`${
                    darkMode
                      ? 'bg-gray-700 text-white'
                      : ' text-gray-700 bg-gray-100'
                  } px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6`}
                >
                  <button
                    type='button'
                    disabled={deleting}
                    onClick={async () => {
                      setDeleting(true)
                      const res = await fetch(
                        `${apiUrl}/api/books/${book.id}`,
                        {
                          method: 'DELETE',
                        }
                      )
                      if (res.ok) {
                        window.location.href = '/'
                      } else {
                        alert('No se pudo eliminar el libro')
                        setDeleting(false)
                        setShowConfirm(false)
                      }
                    }}
                    className='inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-red-500 sm:ml-3 sm:w-auto'
                  >
                    {deleting ? 'Deleting...' : 'Delete'}
                  </button>
                  <button
                    type='button'
                    onClick={() => setShowConfirm(false)}
                    className={`mt-3 inline-flex w-full justify-center rounded-md 
                      ${
                        darkMode
                          ? ' text-gray-300 bg-gray-800 hover:bg-gray-600 ring-gray-600 '
                          : 'text-gray-900 bg-white hover:bg-gray-200  ring-gray-300'
                      }  px-3 py-2 text-sm font-semibold shadow-xs ring-1 sm:mt-0 sm:w-auto`}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default BookDetails
