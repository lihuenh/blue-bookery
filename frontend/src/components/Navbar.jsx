import React from 'react'
import { Link } from 'react-router-dom'
import { FaSun, FaMoon } from 'react-icons/fa'

function Navbar({ darkMode, toggleDarkMode }) {
  return (
    <nav
      className={`fixed top-0 left-0 w-full p-4 shadow-md z-10 transition-all duration-500 ${
        darkMode ? 'bg-gray-800' : 'bg-gray-200'
      }`}
    >
      <div className='flex justify-between'>
        <div className='flex space-x-4'>
          <Link
            to='/'
            className={`text-xl font-semibold ${
              darkMode ? 'text-white' : 'text-gray-700'
            }`}
          >
            List Books
          </Link>
          <Link
            to='/add'
            className={`text-xl font-semibold ${
              darkMode ? 'text-white' : 'text-gray-700'
            }`}
          >
            Add Book
          </Link>
        </div>
        <button
          onClick={toggleDarkMode}
          className={`text-xl p-2  bg-gray-300  rounded ${
            darkMode
              ? 'text-gray-200 dark:bg-slate-500 hover:bg-gray-400'
              : 'text-yellow-400 hover:text-yellow-300 dark:bg-blue-400 hover:bg-blue-300'
          }`}
        >
          {darkMode ? <FaMoon /> : <FaSun />}
        </button>
      </div>
    </nav>
  )
}

export default Navbar
