import React, {useState} from 'react';
import {NavLink, useLocation} from 'react-router-dom';
import {MdOutlineSearch} from 'react-icons/md';
import {PiFilmReelLight} from 'react-icons/pi';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const location = useLocation();

  const pathNameArr = [
    {
      path: '/',
      pathName: 'Home',
    },
    {
      path: '/movies',
      pathName: 'Movies',
    },
    {
      path: '/tvshows',
      pathName: 'TV Shows',
    },
  ];

  console.log(location?.pathname, 'location');

  return (
    <div className="fixed left-0 top-0 z-50 w-full bg-gradient-to-b from-black/70 to-transparent text-white p-4">
      <div className="flex justify-between items-center w-full mx-auto px-6 sm:px-12 md:px-20">
        {/* Logo */}
        <div className="font-bold flex justify-center gap-1 items-center">
          <div className="flex text-3xl">
            <p className="text-white">Any</p>
            <p className="text-red-500">Film</p>
          </div>
          <PiFilmReelLight className="text-3xl" />
        </div>
        {/* Mobile Menu Toggle */}
        <div className="sm:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
        {/* Navbar Links */}
        <div
          className={`flex space-x-6 sm:space-x-8 ${
            isMobileMenuOpen ? 'block' : 'hidden'
          } sm:flex`}
        >
          {pathNameArr?.map((pathObj, i) => {
            return (
              <>
                <NavLink
                  to={pathObj?.path}
                  className={`${pathObj?.path === location?.pathname ? 'text-red-500 scale-125' : ''} hover:text-red-500 text-lg hover:scale-125 duration-300 ease-in-out`}
                >
                  {pathObj?.pathName}
                </NavLink>
              </>
            );
          })}
        </div>
        {/* Search Bar */}
        <div className="h-10 flex justify-center items-center border border-gray-300 rounded-2xl w-48 sm:w-auto">
          <input
            type="text"
            placeholder="Search..."
            className="outline-none px-4 w-full"
          />
          <button className="h-full ml-2 px-4 bg-transparent text-white rounded-2xl cursor-pointer">
            <MdOutlineSearch className="text-xl" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
