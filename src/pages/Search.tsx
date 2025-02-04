import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {useLocation} from 'react-router-dom';
import {apiToken, imgLink, search} from '../modules/ApiLinks';
import Loader from '../components/Loader';

const Search = () => {
  const [searchData, setSearchData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const location = useLocation();
  const queryParam = new URLSearchParams(location.search);
  const searchParam = queryParam.get('q');

  console.log(searchParam, 'searchParam');

  const handleSearchApiCall = async () => {
    setLoading(true);
    try {
      const response = await axios.get(search, {
        headers: {
          Authorization: `Bearer ${apiToken}`,
        },
        params: {query: searchParam},
      });
      setSearchData(response?.data?.results);
      setLoading(false);
    } catch (error) {
      setError(false);
      setLoading(false);
    }
  };

  useEffect(() => {
    handleSearchApiCall();
  }, [searchParam]);

  return (
    <>
      {searchData?.length && (
        <>
          <div className="bg-gray-900 h-fit min-h-screen flex flex-wrap justify-center items-start gap-4 sm:gap-12 pt-32 sm:pt-24 max-w-full mx-auto px-2 sm:px-8 py-8">
            {searchData?.map((item, i) => {
              return (
                <div
                  key={i}
                  className="relative hover:border-2 rounded-lg shadow-xl bg-gray-800 h-fit w-[150px] sm:w-[200px] md:w-[220px] lg:w-[240px] hover:scale-110 ease-in-out duration-300"
                >
                  <img
                    src={`${
                      item?.poster_path
                        ? `${imgLink}${item?.poster_path}`
                        : 'no-img.jpg'
                    }`}
                    className="w-full object-cover object-center rounded-tl-lg rounded-tr-lg h-56 sm:h-64 md:h-72 lg:h-80"
                    alt="search-img"
                  />
                  <div className="absolute -top-2 -left-2 border rounded-md bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 px-3 py-1 text-xs text-white">
                    {item?.vote_average.toFixed(1)}{' '}
                  </div>
                  <p className="px-4 py-2 text-white text-sm truncate text-center">
                    {item?.title || item?.name}
                  </p>
                </div>
              );
            })}
          </div>
        </>
      )}
      {loading && <Loader />}
    </>
  );
};

export default Search;
