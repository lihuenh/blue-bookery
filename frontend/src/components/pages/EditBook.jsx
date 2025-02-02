import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom' // Cambiar useHistory por useNavigate

const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000'

function EditBook({ darkMode }) {
  const { id } = useParams() // Obtener el id del libro desde la URL
  const [book, setBook] = useState(null) // Estado para almacenar los datos del libro
  const navigate = useNavigate() // Usar useNavigate en lugar de useHistory

  useEffect(() => {
    // Cargar los datos del libro desde la API
    fetch(`${apiUrl}/api/books/${id}`)
      .then((response) => response.json())
      .then((data) => setBook(data)) // Establecer los datos en el estado
  }, [id])

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(book)

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
      className={`mb-6 mt-6 transition-all duration-500 ${
        darkMode ? ' text-white' : 'text-black'
      }`}
    >
      <h1
        className={`text-3xl font-semibold ${
          darkMode ? 'text-white' : 'text-gray-900'
        }`}
      >
        Edit Book
      </h1>
      <form onSubmit={handleSubmit} className='grid grid-cols-1 gap-4 mt-4'>
        {/* Mapear todos los campos del libro para crear los inputs */}
        {Object.keys(book).map(
          (key) =>
            key !== 'id' && ( // No mostrar el campo 'id'
              <div key={key} className='col-span-1'>
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
                  className={`p-2 mt-2 border rounded w-full ${
                    darkMode
                      ? 'bg-gray-700 text-gray-200 border-gray-600'
                      : 'bg-white text-black border-gray-300'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-500`}
                />
              </div>
            )
        )}
        <button
          type='submit'
          className={`mt-4 w-full p-2 rounded ${
            darkMode
              ? 'bg-blue-500 text-white hover:bg-blue-600'
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          Update
        </button>
      </form>
    </div>
  )
}

export default EditBook
