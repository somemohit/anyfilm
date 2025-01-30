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

const Home = () => {
  const [movieData, setMovieData] = useState({
    backdropPath: '',
    title: '',
    overview: '',
  });

  const categoryData = [
    {
      categoryEndpoint: nowPlaying,
      categoryName: 'Now Playing',
    },
    {
      categoryEndpoint: popular,
      categoryName: 'Popular Movies',
    },
    {
      categoryEndpoint: popularShow,
      categoryName: 'Popular Shows',
    },
    {
      categoryEndpoint: topRatedMovies,
      categoryName: 'Top Rated Movies',
    },
    {
      categoryEndpoint: topRatedShows,
      categoryName: 'Top Rated Shows',
    },
  ];

  return (
    <>
      <TopMainBanner
        bannerData={movieData}
        setBannerData={setMovieData}
        bannerApiUrl={popular}
      />

      <div className="flex flex-col gap-2 bg-gray-900 py-6">
        {categoryData?.map((item) => {
          return (
            <>
              <div className="py-10">
                <CategoryStripBanner categoryName={item?.categoryName} />
                <DisplayCard categoryEndpoint={item?.categoryEndpoint} />
              </div>
            </>
          );
        })}
      </div>
    </>
  );
};

export default Home;
