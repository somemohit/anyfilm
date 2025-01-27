import React from 'react'

const Navbar = () => {
  return (
    <div className="bg-blue-600 text-white p-4 shadow-md">
      <div className="flex justify-between items-center max-w-6xl mx-auto">
        <div className="text-xl font-bold">AnyFilm</div>
        <div className="space-x-6">
          <a href="#" className="hover:text-gray-300">Home</a>
        </div>
      </div>
    </div>
  )
}

export default Navbar
