// Vite react button
import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeftIcon } from '@heroicons/react/24/solid'

function BackButton({ darkMode }) {
  return (
    <div className='md:flex justify-between items-center sticky top-0 pb-4'>
      <Link
        to='/'
        className='w-28 h-8 bg-blue-700 text-white rounded-full hover:bg-blue-600 flex items-center justify-center text-sm font-semibold hover:ring-2 hover:ring-blue-500 transition duration-200 ease-in-out'
      >
        <ArrowLeftIcon className='h-5 w-5' />
        <span className='ml-2'>Back</span>
      </Link>
    </div>
  )
}
export default BackButton
