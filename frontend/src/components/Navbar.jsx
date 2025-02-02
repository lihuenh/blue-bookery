import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaSun, FaMoon, FaBars } from 'react-icons/fa'

function Navbar({ darkMode, toggleDarkMode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  const closeMenu = () => setIsMenuOpen(false)

  return (
    <nav
      className={`fixed top-0 left-0 w-full p-4 shadow-md z-10 transition-all duration-500 ${
        darkMode ? 'bg-gray-800' : 'bg-gray-200'
      }`}
    >
      <div className='flex justify-between items-center'>
        {/* Ícono de la hamburguesa (solo en versión móvil, a la izquierda) */}
        <div className='md:hidden'>
          <FaBars
            onClick={toggleMenu}
            className={`text-xl cursor-pointer h-7 w-7 ${
              darkMode ? 'text-white' : 'text-gray-700'
            }`}
          />
        </div>

        {/* Logo (centrado en móvil, a la izquierda en escritorio) */}
        <div className='flex items-center justify-center md:justify-start lg:ml-5'>
          <Link
            to='/'
            className={`text-2xl font-semibold flex items-center space-x-2 ${
              darkMode ? 'text-white' : 'text-gray-700'
            }`}
            onClick={closeMenu}
          >
            <img
              src={`${darkMode ? '/logo-light.svg' : '/logo.svg'}`} // Ruta al logo (asegurate de que esté en la carpeta public)
              alt='Logo'
              className='w-10 h-10'
            />
            <span>Blue Bookery</span>
          </Link>
        </div>

        {/* Menú en versión escritorio (centrado) */}
        <div className='hidden md:flex flex-1 justify-center space-x-6'>
          <Link
            to='/'
            className={`text-xl font-semibold transition-all duration-300 ${
              darkMode ? 'text-white' : 'text-gray-700'
            } hover:text-blue-500 hover:underline`}
          >
            Home
          </Link>
          <Link
            to='/add'
            className={`text-xl font-semibold transition-all duration-300 ${
              darkMode ? 'text-white' : 'text-gray-700'
            } hover:text-blue-500 hover:underline`}
          >
            Add Book
          </Link>
        </div>

        {/* Switch de Dark Mode (visible tanto en móvil como en escritorio) */}
        <div className='flex items-center lg:mr-4'>
          <div
            className={`relative w-14 h-8 flex items-center rounded-full p-1 cursor-pointer transition-all duration-300 ${
              darkMode ? 'bg-slate-600' : 'bg-gray-300'
            }`}
            onClick={toggleDarkMode}
          >
            <div
              className={`w-6 h-6 bg-white rounded-full flex justify-center items-center transition-all duration-300 ${
                darkMode ? 'transform translate-x-6' : ''
              }`}
            >
              {darkMode ? (
                <FaMoon className='text-gray-400' />
              ) : (
                <FaSun className='text-yellow-500' />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Menú desplegable en móvil */}
      <div
        className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'} ${
          darkMode ? 'text-white ' : 'text-gray-700 '
        } mt-4 p-4`}
      >
        <Link
          to='/'
          className={`block text-xl font-semibold mb-4 transition-all duration-300 ${
            darkMode ? 'text-white' : 'text-gray-700'
          } hover:text-blue-500 hover:underline`}
          onClick={closeMenu}
        >
          Home
        </Link>
        <Link
          to='/add'
          className={`block text-xl font-semibold mb-4 transition-all duration-300 ${
            darkMode ? 'text-white' : 'text-gray-700'
          } hover:text-blue-500 hover:underline`}
          onClick={closeMenu}
        >
          Add Book
        </Link>
      </div>
    </nav>
  )
}

export default Navbar
