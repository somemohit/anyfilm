import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
  nowPlaying,
  popular,
  popularShow,
  topRatedMovies,
  topRatedShows,
  upcoming,
} from '../modules/ApiLinks';
import DisplayCard from '../components/DisplayCard';
import TopMainBanner from '../components/TopMainBanner';
import CategoryStripBanner from '../components/CategoryStripBanner';
import ModalComponent from '../components/ModalComponent';

const Home = () => {
  const [movieData, setMovieData] = useState({
    backdropPath: '',
    title: '',
    overview: '',
    id: '',
  });
  const [openModal, setOpenModal] = useState(false);

  const categoryData = [
    {
      categoryEndpoint: nowPlaying,
      categoryName: 'Now Playing',
      category: 'movie',
    },
    {
      categoryEndpoint: popular,
      categoryName: 'Popular Movies',
      category: 'movie',
    },
    {
      categoryEndpoint: popularShow,
      categoryName: 'Popular Shows',
      category: 'tv',
    },
    {
      categoryEndpoint: topRatedMovies,
      categoryName: 'Top Rated Movies',
      category: 'movie',
    },
    {
      categoryEndpoint: topRatedShows,
      categoryName: 'Top Rated Shows',
      category: 'tv',
    },
  ];

  return (
    <>
      <TopMainBanner
        bannerData={movieData}
        setBannerData={setMovieData}
        bannerApiUrl={popular}
        category={'movie'}
      />

      <div className="flex flex-col gap-2 bg-gray-900 py-2 sm:py-6">
        {categoryData?.map((item) => {
          return (
            <>
              <div className="py-4 sm:py-10">
                <CategoryStripBanner categoryName={item?.categoryName} />
                <DisplayCard
                  categoryEndpoint={item?.categoryEndpoint}
                  category={item?.category}
                />
              </div>
            </>
          );
        })}
      </div>
    </>
  );
};

export default Home;
