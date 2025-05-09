import React, { useState } from 'react'

function BookForm({ book, setBook, onSubmit, darkMode }) {
  const [previewImage, setPreviewImage] = useState(
    book.image?.trim() !== '' ? book.image : ''
  )

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const imageURL = URL.createObjectURL(file)
      setPreviewImage(imageURL)
      setBook({ ...book, imageFile: file })
    }
  }

  return (
    <div
      className={`transition-all duration-300 ${
        darkMode ? 'text-white' : 'text-slate-700'
      }`}
    >
      <h2
        className={`text-xl font-semibold mb-5 ${
          darkMode ? 'text-white' : 'text-slate-700'
        }`}
      >
        {book.id ? 'Edit Book' : 'New Book'}
      </h2>

      <div className='grid md:grid-cols-1 gap-6 items-start'>
        {/* Formulario a la izquierda */}
        <div className='grid grid-cols-1 gap-5'>
          {Object.keys(book).map((key) =>
            key !== 'image' && key !== 'imageFile' ? (
              <input
                key={key}
                type='text'
                placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
                value={book[key]}
                onChange={(e) => setBook({ ...book, [key]: e.target.value })}
                className={`p-2 border rounded h-10 px-3 py-1 ${
                  darkMode
                    ? 'bg-gray-700 text-white border-gray-600'
                    : 'bg-gray-50 text-slate-700 border-gray-300'
                } focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300`}
              />
            ) : null
          )}
        </div>

        {/* Vista previa de imagen + input de archivo */}
        <div className='flex flex-col h-full'>
          <div className='flex-grow'>
            <img
              src={
                previewImage !== ''
                  ? previewImage
                  : 'https://img.freepik.com/free-vector/glitch-error-404-page_23-2148105404.jpg'
              }
              alt='Preview'
              className='rounded-lg shadow-md object-contain w-[200px] h-full max-h-[500px]'
            />
          </div>
          <div className='mt-4'>
            <input
              type='file'
              accept='image/*'
              onChange={handleFileChange}
              className='block w-full text-sm text-gray-500
                         file:mr-4 file:py-2 file:px-4
                         file:rounded file:border-0
                         file:text-sm file:font-semibold
                         file:bg-blue-50 file:text-blue-700
                         hover:file:bg-blue-100'
            />
          </div>
        </div>
      </div>

      <button
        onClick={onSubmit}
        className={`mt-6 w-full p-2 rounded ${
          darkMode
            ? 'bg-green-700 text-white hover:bg-green-600'
            : 'bg-green-600 text-white hover:bg-green-500'
        }`}
      >
        {book.id ? 'Update' : 'Add'}
      </button>
    </div>
  )
}

export default BookForm
