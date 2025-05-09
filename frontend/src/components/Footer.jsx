const Footer = ({ darkMode }) => {
  return (
    <footer
      className={`${
        darkMode ? 'bg-gray-800' : 'bg-gray-100'
      } fixed bottom-0 left-0 w-full p-4 text-center transition-all duration-300`}
    >
      <p className='text-sm transition-none'>
        {darkMode ? 'Dark Mode Footer' : 'Light Mode Footer'}
      </p>
    </footer>
  )
}

export default Footer
