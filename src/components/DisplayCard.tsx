import React, {useEffect, useState} from 'react';
import {
  apiToken,
  imgLink,
  movieCredits,
  movieDetails,
  tvShowCredits,
  tvShowDetails,
} from '../modules/ApiLinks';
import axios from 'axios';
import {FaChevronLeft, FaChevronRight} from 'react-icons/fa';
import Loader from './Loader';
import moment from 'moment';
import ModalComponent from './ModalComponent';
import PopUpAllDetails from './PopUpAllDetails';

const DisplayCard = ({categoryEndpoint, category}) => {
  const [movieCardData, setMovieCardData] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [count, setCount] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [contentId, setContentId] = useState('');

  const fetchMovieCardData = async () => {
    setLoading(true);
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

  const handleDisplayCardClick = (id) => {
    setOpenModal(true);
    setContentId(id);
  };

  const handleNext = () => {
    if (count < movieCardData?.length - 2) {
      setCount((prevCount) => prevCount + 1);
    }
  };

  const handlePrev = () => {
    if (count > 0) {
      setCount((prevCount) => prevCount - 1);
    }
  };

  useEffect(() => {
    fetchMovieCardData();
  }, [categoryEndpoint]);

  console.log(count, 'count');

  return (
    <>
      <div className="relative overflow-x-hidden max-w-full flex justify-center">
        <div className="max-w-11/12 overflow-x-hidden">
          <div
            style={{
              transform: `translateX(-${count * 260}px)`,
            }}
            className={`duration-300 ease-in-out flex justify-start items-start gap-5 sm:gap-7 md:gap-7 max-w-full sm:max-w-11/12 px-4 sm:px-4 py-4 sm:py-8`}
          >
            {movieCardData?.map((item, i) => {
              return (
                <div
                  key={i}
                  onClick={() => handleDisplayCardClick(item?.id)}
                  className="relative cursor-pointer hover:border-2 rounded-lg shadow-xl bg-gray-800 h-fit min-w-[150px] sm:min-w-[200px] md:min-w-[220px] lg:min-w-[260px] hover:scale-110 ease-in-out duration-300"
                >
                  <img
                    src={`${
                      item?.poster_path
                        ? `${imgLink}${item?.poster_path}`
                        : 'no-img.jpg'
                    }`}
                    className="w-full object-cover object-center rounded-lg h-56 sm:h-64 md:h-72 lg:h-[380px]"
                    alt="movie-img"
                  />
                  <div className="absolute -top-2 -left-2 border rounded-md bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 px-3 py-1 text-xs text-white">
                    {item?.vote_average.toFixed(1)}{' '}
                  </div>
                  <div className="absolute bottom-0 left-0 bg-red-500/10 backdrop-blur-xs w-full rounded-bl-lg rounded-br-lg px-4 py-2 text-white text-sm text-center">
                    <p className="text-sm sm:text-base font-bold truncate">
                      {item?.title || item?.name}
                    </p>
                    <p className="text-xs">
                      {moment(item.release_date).format('MMMM Do YYYY')}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <button
          onClick={handlePrev}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 cursor-pointer bg-white/30 backdrop-blur-md border border-white rounded-full p-2 sm:p-4 text-black hover:bg-white/50 duration-300 ease-in-out  focus:outline-none"
        >
          <FaChevronLeft size={24} />
        </button>

        <button
          onClick={handleNext}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer bg-white/30 backdrop-blur-md border border-white rounded-full p-2 sm:p-4 text-black hover:bg-white/50 duration-300 ease-in-out focus:outline-none"
        >
          <FaChevronRight size={24} />
        </button>
      </div>

      <ModalComponent
        isModalOpen={openModal}
        closeModal={() => setOpenModal(false)}
      >
        <PopUpAllDetails
          contentDetailsEndpoint={
            category === 'tv'
              ? tvShowDetails(contentId)
              : movieDetails(contentId)
          }
          contentCreditDetailsEndpoint={
            category === 'tv'
              ? tvShowCredits(contentId)
              : movieCredits(contentId)
          }
        />
      </ModalComponent>

      {loading && <Loader />}
    </>
  );
};

export default DisplayCard;
