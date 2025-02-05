import React, {useState} from 'react';
import {NavLink, useLocation, useNavigate} from 'react-router-dom';
import {MdOutlineSearch} from 'react-icons/md';
import {PiFilmReelLight} from 'react-icons/pi';
// import {GiHamburgerMenu} from 'react-icons/gi';
import {Link} from 'react-router-dom';

const Navbar = () => {
  // const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const location = useLocation();
  const navigate = useNavigate();

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

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchClick = async () => {
    navigate(`/search?q=${searchQuery}`);
  };

  console.log(location?.pathname, 'location');

  return (
    <>
      <div className="fixed left-0 top-0 z-50 w-full bg-gradient-to-b from-black/70 to-transparent text-white p-4">
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-1 justify-between items-center w-full mx-auto px-4 sm:px-12 md:px-20">
          <div className="flex justify-between w-full sm:w-3/5">
            {/* Logo */}
            <Link
              to="/"
              className="font-bold flex justify-center gap-1 items-center"
            >
              <div className="flex text-xl sm:text-3xl">
                <p className="text-white">Any</p>
                <p className="text-red-500">Film</p>
              </div>
              <PiFilmReelLight className="text-xl sm:text-3xl" />
            </Link>

            {/* Navbar Links */}
            <div className={`flex items-center space-x-6 sm:space-x-8 sm:flex`}>
              {pathNameArr?.map((pathObj, i) => {
                return (
                  <>
                    <NavLink
                      key={i}
                      to={pathObj?.path}
                      className={`${
                        pathObj?.path === location?.pathname
                          ? 'text-red-500 scale-125'
                          : ''
                      } hover:text-red-500 text-xs sm:text-lg hover:scale-125 duration-300 ease-in-out`}
                    >
                      {pathObj?.pathName}
                    </NavLink>
                  </>
                );
              })}
            </div>
          </div>

          {/* Search Bar */}
          <div className="h-10 flex justify-center items-center border border-gray-300 rounded-2xl w-10/11 sm:w-1/4">
            <input
              type="text"
              placeholder="Search..."
              className="outline-none px-4 w-full"
              onChange={handleSearchChange}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSearchClick();
                }
              }}
            />
            <button
              onClick={handleSearchClick}
              className="h-full ml-2 px-4 bg-transparent text-white rounded-2xl cursor-pointer"
            >
              <MdOutlineSearch className="text-xl" />
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          {/* <div className="sm:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white"
            >
              <GiHamburgerMenu />
            </button>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default Navbar;
