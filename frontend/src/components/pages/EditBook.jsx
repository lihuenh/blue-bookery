import React, { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import BackButton from '../Buttons/BackButton'

const apiUrl = import.meta.env.VITE_API_URL ?? ''

function EditBook({ darkMode }) {
  const { id } = useParams() // Obtener el id del libro desde la URL
  const [book, setBook] = useState(null) // Estado para almacenar los datos del libro
  const navigate = useNavigate() // Usar useNavigate en lugar de useHistory

  useEffect(() => {
    // Cargar los datos del libro desde la API
    fetch(`${apiUrl}/api/books/${id}`)
      .then((response) => response.json())
      .then((data) => setBook(data))
    // Establecer los datos en el estado
  }, [id])

  const handleSubmit = (e) => {
    e.preventDefault()

    // Enviar los datos editados del libro a la API
    fetch(`${apiUrl}/api/books/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(book), // Enviar los datos del libro
    }).then(() => {
      // Redirigir a la página de detalles del libro después de actualizar
      navigate(`/book/${id}`) // Usar navigate en lugar de history.push
    })
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setBook({ ...book, [name]: value }) // Actualizar el estado con los nuevos valores
  }

  if (!book) return <p>Loading...</p> // Mostrar un mensaje mientras los datos se cargan

  return (
    <div
      className={`transition-all duration-500${
        darkMode ? ' text-white' : 'text-black'
      }`}
    >
      <BackButton darkMode={darkMode} />
      <h1
        className={`text-3xl font-bold mb-4 ${
          darkMode ? 'text-[#f8f6ea]' : 'text-slate-700'
        }`}
      >
        Edit Book
      </h1>
      <form onSubmit={handleSubmit} className='grid grid-cols-1 gap-4 mt-4'>
        {/* Mapear todos los campos del libro para crear los inputs */}
        {Object.keys(book).map(
          (key) =>
            key !== 'id' && ( // No mostrar el campo 'id'
              <div key={key} className='col-span-1 '>
                <label
                  htmlFor={key}
                  className={`block text-sm font-medium ${
                    darkMode ? 'text-white' : 'text-gray-900'
                  }`}
                >
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </label>
                <input
                  id={key}
                  name={key}
                  type='text'
                  placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
                  value={book[key]}
                  onChange={handleChange}
                  className={`p-2 mt-2 border rounded-md w-full ${
                    darkMode
                      ? 'bg-gray-700 text-white border-gray-600'
                      : 'bg-gray-50 text-slate-700 border-gray-300'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-100`}
                />
              </div>
            )
        )}
        <button
          type='submit'
          className={`mt-6 w-full p-2 rounded-full ${
            darkMode
              ? 'bg-green-700 text-white hover:bg-green-600'
              : 'bg-green-600 text-white hover:bg-green-500'
          } hover:ring-2 hover:ring-green-300 transition duration-200 ease-in-out`}
        >
          {book.id ? 'Update' : 'Add'}
        </button>
      </form>
    </div>
  )
}

export default EditBook
