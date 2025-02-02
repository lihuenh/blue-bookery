const Footer = ({ darkMode }) => {
  return (
    <footer
      className={`${
        darkMode ? 'bg-gray-800' : 'bg-gray-200'
      } sticky bottom-0 w-full p-4 text-center transition-all duration-500`}
    >
      <p className='text-sm'>
        {darkMode ? 'Dark Mode Footer' : 'Light Mode Footer'}
      </p>
    </footer>
  )
}

export default Footer
