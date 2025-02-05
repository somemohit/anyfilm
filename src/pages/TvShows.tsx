import React, {useState} from 'react';
import TopMainBanner from '../components/TopMainBanner';
import {
  airingTodayShows,
  onTheAirShows,
  popularShow,
  topRatedShows,
} from '../modules/ApiLinks';
import CategoryStripBanner from '../components/CategoryStripBanner';
import DisplayCard from '../components/DisplayCard';

const TvShows = () => {
  const [tvShowData, setTvShowData] = useState({
    backdropPath: '',
    title: '',
    overview: '',
  });

  const categoryData = [
    {
      categoryEndpoint: airingTodayShows,
      categoryName: 'Airing Today',
      category: 'tv',
    },
    {
      categoryEndpoint: popularShow,
      categoryName: 'Popular Shows',
      category: 'tv',
    },
    {
      categoryEndpoint: onTheAirShows,
      categoryName: 'On The Air Shows',
      category: 'tv',
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
        bannerData={tvShowData}
        setBannerData={setTvShowData}
        bannerApiUrl={popularShow}
        category={'tv'}
      />
      <div className="flex flex-col gap-2 bg-gray-900 py-2 sm:py-6">
        {categoryData?.map((item) => {
          return (
            <>
              <div key={item?.categoryName} className="py-4 sm:py-10">
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

export default TvShows;
