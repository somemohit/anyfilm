import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {apiToken, baseUrl} from '../modules/ApiLinks';
import {AiOutlineInfoCircle} from 'react-icons/ai';

const Home = () => {
  const [movieData, setMovieData] = useState({
    backdropPath: '',
    title: '',
    overview: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}/movie/popular?language=en-US&page=1`,
        {
          headers: {
            Authorization: `Bearer ${apiToken}`,
          },
        }
      );
      const randomIndex = Math.floor(
        Math.random() * response?.data?.results?.length
      );
      const randomMedia = response?.data?.results[randomIndex];
      setMovieData({
        backdropPath: `https://image.tmdb.org/t/p/original${randomMedia?.backdrop_path}`,
        title: randomMedia?.title,
        overview: randomMedia?.overview,
      });
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(); // Call the async function
  }, []);

  console.log(movieData, 'movieData');

  return (
    <>
      <div className="relative h-screen flex justify-start items-center p-8 sm:p-16 md:p-20">
        {/* Background container with the overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{backgroundImage: `url(${movieData?.backdropPath})`}}
        >
          {/* Overlay for slight dark effect */}
          <div className="absolute inset-0 bg-black opacity-30"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 w-full sm:w-2/3 lg:w-1/2 flex flex-col justify-between gap-4">
          <p className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">
            {movieData?.title}
          </p>
          <p className="text-sm sm:text-lg md:text-xl text-white">
            {movieData?.overview}
          </p>

          <button
            // onClick={handleClick}
            className="w-fit cursor-pointer flex items-center gap-2 px-4 py-2 border rounded-full bg-gray-500 hover:bg-gray-400 text-white transition duration-300 ease-in-out"
          >
            <AiOutlineInfoCircle className="text-xl" />
            <span className="text-lg">More Info</span>
          </button>
        </div>
      </div>

      <div className="flex justify-center items-center gap-4">
        {/* {data?.results?.map((item, i) => {
          return (
            <div key={i} className="border-2 shadow-xl p-4 bg-gray-500">
              {item?.title}
            </div>
          );
        })} */}
      </div>
    </>
  );
};

export default Home;
