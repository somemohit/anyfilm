import React, {useEffect, useState} from 'react';
import {
  apiToken,
  baseUrl,
  imgLink,
  movieCredits,
  movieDetails,
} from '../modules/ApiLinks';
import {AiOutlineInfoCircle} from 'react-icons/ai';
import axios from 'axios';
import ModalComponent from './ModalComponent';
import moment from 'moment';

const TopMainBanner = ({bannerData, setBannerData, bannerApiUrl}) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [movieAllDetails, setMovieAllDetails] = useState();
  const [movieCreditDetails, setMovieCreditDetails] = useState();

  const fetchData = async () => {
    try {
      const response = await axios.get(`${bannerApiUrl}`, {
        headers: {
          Authorization: `Bearer ${apiToken}`,
        },
      });
      const randomIndex = Math.floor(
        Math.random() * response?.data?.results?.length
      );
      const randomMedia = response?.data?.results[randomIndex];
      setBannerData({
        backdropPath: `${imgLink}${randomMedia?.backdrop_path}`,
        title: randomMedia?.title || randomMedia?.name,
        overview: randomMedia?.overview,
        id: randomMedia?.id,
      });
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  const getMovieData = async () => {
    const url = movieDetails(bannerData?.id);
    try {
      const response = await axios.get(`${url}`, {
        headers: {
          Authorization: `Bearer ${apiToken}`,
        },
      });
      setMovieAllDetails(response?.data);
      console.log(response, 'responsehhh');
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const getMovieCredits = async () => {
    const url = movieCredits(bannerData?.id);
    try {
      const response = await axios.get(`${url}`, {
        headers: {
          Authorization: `Bearer ${apiToken}`,
        },
      });
      setMovieCreditDetails(response?.data);
      console.log(response, 'responsehhh');
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleMoreInfoClick = () => {
    setOpenModal(true);
    getMovieData();
    getMovieCredits();
  };

  useEffect(() => {
    fetchData();
  }, []);

  console.log(movieCreditDetails, 'bannerData');

  return (
    <>
      <div className="relative h-screen flex justify-start items-center p-8 sm:p-16 md:p-20">
        {/* Background container with the overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{backgroundImage: `url(${bannerData?.backdropPath})`}}
        >
          {/* Overlay for slight dark effect */}
          <div className="absolute inset-0 bg-black opacity-30"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 w-full sm:w-2/3 lg:w-1/2 flex flex-col justify-between gap-4">
          <p className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">
            {bannerData?.title}
          </p>
          <p className="text-sm sm:text-lg md:text-xl text-white">
            {bannerData?.overview}
          </p>

          <button
            onClick={handleMoreInfoClick}
            className="w-fit cursor-pointer flex items-center gap-2 px-4 py-2 border rounded-full bg-gray-500 hover:bg-gray-400 text-white transition duration-300 ease-in-out"
          >
            <AiOutlineInfoCircle className="text-xl" />
            <span className="text-sm sm:text-lg">More Info</span>
          </button>
        </div>
      </div>

      <ModalComponent
        isModalOpen={openModal}
        closeModal={() => setOpenModal(false)}
      >
        {movieAllDetails && (
          <div>
            <img
              src={`${
                movieAllDetails?.backdrop_path
                  ? `${imgLink}${movieAllDetails?.backdrop_path}`
                  : 'no-img.jpg'
              }`}
              className="w-full object-cover object-center rounded-lg h-56 sm:h-64 md:h-72 lg:h-[380px]"
              alt="movie-img"
            />
            <div className="font-anton tracking-wider uppercase text-3xl font-bold text-red-500">
              {movieAllDetails?.title}
            </div>
            <div className="flex justify-between items-center">
              <div>
                <p>{movieAllDetails?.tagline}</p>
                <div className="flex gap-1">
                  Genres:
                  {movieAllDetails?.genres?.map((item, i) => {
                    return <p key={item.id}>{item?.name}</p>;
                  })}
                </div>
              </div>
              <div>
                <p>{movieAllDetails?.runtime} minutes</p>
                <p>
                  {moment(movieAllDetails.release_date).format('MMMM Do YYYY')}
                </p>
              </div>
            </div>
            <div>{movieAllDetails?.overview}</div>
          </div>
        )}

        {movieCreditDetails && (
          <div>
            <p className="font-anton tracking-wider uppercase text-3xl text-center">
              Cast
            </p>
            <div className="flex flex-wrap justify-center items-center gap-4">
              {movieCreditDetails?.cast?.slice(1, 20).map((item, i) => {
                return (
                  <div key={item?.credit_id}>
                    <img
                      src={`${
                        item?.profile_path
                          ? `${imgLink}${item?.profile_path}`
                          : 'no-img.jpg'
                      }`}
                      className="w-12 sm:w-16 md:w-20 lg:w-22 object-cover object-center border-2 rounded-full h-12 sm:h-16 md:h-20 lg:h-22"
                      alt="movie-img"
                    />{' '}
                    <div className=''>
                      <p className="text-base">{item?.name}</p>
                      <p className="text-sm text-gray-500">{item?.character}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </ModalComponent>
    </>
  );
};

export default TopMainBanner;
