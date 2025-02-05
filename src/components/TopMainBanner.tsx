import React, {useEffect, useState} from 'react';
import {
  apiToken,
  imgLink,
  movieCredits,
  movieDetails,
  tvShowCredits,
  tvShowDetails,
} from '../modules/ApiLinks';
import {AiOutlineInfoCircle} from 'react-icons/ai';
import axios from 'axios';
import ModalComponent from './ModalComponent';
import PopUpAllDetails from './PopUpAllDetails';
import {MovieData} from '../modules/types_file';

type TopMainBannerProps = {
  bannerData: MovieData;
  setBannerData: React.Dispatch<React.SetStateAction<MovieData>>;
  bannerApiUrl: string;
  category: string;
};

const TopMainBanner: React.FC<TopMainBannerProps> = ({
  bannerData,
  setBannerData,
  bannerApiUrl,
  category,
}) => {
  // const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);
  const [openModal, setOpenModal] = useState(false);

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
      // setLoading(false);
    } catch (error) {
      setError(error);
      // setLoading(false);
    }
  };

  const handleMoreInfoClick = () => {
    setOpenModal(true);
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(error, 'errors');

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
        <PopUpAllDetails
          contentDetailsEndpoint={
            category === 'tv'
              ? tvShowDetails(bannerData?.id)
              : movieDetails(bannerData?.id)
          }
          contentCreditDetailsEndpoint={
            category === 'tv'
              ? tvShowCredits(bannerData?.id)
              : movieCredits(bannerData?.id)
          }
        />
      </ModalComponent>
    </>
  );
};

export default TopMainBanner;
