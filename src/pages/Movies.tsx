import React, {useState} from 'react';
import TopMainBanner from '../components/TopMainBanner';
import {
  nowPlaying,
  popular,
  topRatedMovies,
  upcoming,
} from '../modules/ApiLinks';
import CategoryStripBanner from '../components/CategoryStripBanner';
import DisplayCard from '../components/DisplayCard';

const Movies = () => {
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
      categoryName: 'Popular',
    },
    {
      categoryEndpoint: upcoming,
      categoryName: 'Upcoming',
    },
    {
      categoryEndpoint: topRatedMovies,
      categoryName: 'Top Rated Movies',
    },
  ];

  return (
    <>
      <TopMainBanner
        bannerData={movieData}
        setBannerData={setMovieData}
        bannerApiUrl={popular}
      />
      <div className="flex flex-col gap-2 bg-gray-900 py-2 sm:py-6">
        {categoryData?.map((item) => {
          return (
            <>
              <div className="py-4 sm:py-10">
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

export default Movies;
