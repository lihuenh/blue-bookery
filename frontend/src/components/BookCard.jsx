import React from 'react'
import { Link } from 'react-router-dom'

function BookCard({ book, darkMode }) {
  return (
    <div
      className={`flex flex-col sm:flex-row w-full sm:rounded-r-sm sm:rounded-l-sm rounded-md shadow-lg shadow-black/20 overflow-hidden  ${
        darkMode
          ? 'bg-slate-800 text-white hover:ring-offset-slate-900'
          : 'bg-gray-100 text-slate-700 hover:ring-offset-gray-100'
      } sm:h-[250px] sm:bg-transparent sm:shadow-none p-3 sm:p-0`}
    >
      <div className='flex justify-center items-start'>
        <Link
          to={`/book/${book.id}`}
          className='block sm:min-w-[160px] sm:h-[250px]'
        >
          <img
            className='sm:h-full sm:w-full w-[250px] sm:max-h-[600px] object-cover rounded-r-xl'
            src={
              book.image ||
              'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fGJvb2slMjBpbWFnZXxlbnwwfHx8fDE2ODQ5NTY1NzM&ixlib=rb-4.0.3&q=80&w=400'
            }
            alt={book.title}
          />
        </Link>
      </div>

      <div className='flex flex-col justify-between w-full mt-4 sm:mt-0 sm:ml-4 overflow-hidden'>
        <div>
          <Link to={`/book/${book.id}`} className=''>
            <h1 className='text-xl font-bold mb-1 hover:underline transition duration-300 ease-in-out cursor-pointer'>
              {book.title}
            </h1>
          </Link>

          <p className='text-md font-medium mb-1'>{book.author}</p>
          <hr className={`my-2 `} />
          <span className='text-sm text-clip'>Genres</span>
          <p className='text-sm text-balance sm:overflow-y-auto'>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque
            illo beatae veritatis a quae vel fugit porro molestias, sed expedita
            inventore accusantium id maxime odio iste dolor, quia nobis ipsa?
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rerum
            eveniet quaerat doloremque voluptas obcaecati. Consequatur eum, ex,
            aliquid optio reprehenderit assumenda eligendi sunt in quibusdam
            voluptatibus nobis ipsum accusamus molestias! Lorem ipsum dolor sit
            amet consectetur adipisicing elit. Quis, itaque harum magni, omnis
            est sapiente distinctio sunt animi voluptas tempore adipisci!
            Cumque, architecto dolorum! Praesentium tempora laborum neque! Eos,
            ea. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque
            illo beatae veritatis a quae vel fugit porro molestias, sed expedita
            inventore accusantium id maxime odio iste dolor, quia nobis ipsa?
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rerum
            eveniet quaerat doloremque voluptas obcaecati. Consequatur eum, ex,
            aliquid optio reprehenderit assumenda eligendi sunt in quibusdam
            voluptatibus nobis ipsum accusamus molestias! Lorem ipsum dolor sit
            amet consectetur adipisicing elit. Quis, itaque harum magni, omnis
            est sapiente distinctio sunt animi voluptas tempore adipisci!
            Cumque, architecto dolorum! Praesentium tempora laborum neque! Eos,
            ea.
          </p>
        </div>
      </div>
    </div>
  )
}

export default BookCard
