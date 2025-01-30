import React, { useEffect, useState } from 'react';
import { apiToken, imgLink } from '../modules/ApiLinks';
import axios from 'axios';

const DisplayCard = ({ categoryEndpoint }) => {
  const [movieCardData, setMovieCardData] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMovieCardData = async () => {
    try {
      const response = await axios.get(categoryEndpoint, {
        headers: {
          Authorization: `Bearer ${apiToken}`,
        },
      });
      console.log(response, 'now playing');
      setMovieCardData(response?.data?.results);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovieCardData();
  }, [categoryEndpoint]);

  return (
    <>
      <div className="flex justify-start items-start gap-6 max-w-11/12 mx-auto overflow-x-scroll px-8 py-8">
        {movieCardData?.map((item, i) => {
          return (
            <div
              key={i}
              className="relative hover:border-2 rounded-lg shadow-xl bg-gray-800 h-fit min-w-[150px] sm:min-w-[200px] md:min-w-[220px] lg:min-w-[240px] hover:scale-110 ease-in-out duration-300"
            >
              <div
                className="bg-cover bg-center h-56 sm:h-64 md:h-72 lg:h-80"
                style={{
                  backgroundImage: `url(${imgLink}${item?.poster_path})`,
                }}
              ></div>
              <div className="absolute -top-2 -left-2 border rounded-md bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 px-3 py-1 text-xs text-white">
                {item?.vote_average.toFixed(1)}{' '}
              </div>
              <p className="px-4 py-2 text-white text-sm truncate text-center">{item?.title || item?.name}</p>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default DisplayCard;
