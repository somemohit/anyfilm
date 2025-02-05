import {useState} from 'react';
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
    id: '',
  });

  const categoryData = [
    {
      categoryEndpoint: nowPlaying,
      categoryName: 'Now Playing',
      category: 'movie',
    },
    {
      categoryEndpoint: popular,
      categoryName: 'Popular',
      category: 'movie',
    },
    {
      categoryEndpoint: upcoming,
      categoryName: 'Upcoming',
      category: 'movie',
    },
    {
      categoryEndpoint: topRatedMovies,
      categoryName: 'Top Rated Movies',
      category: 'movie',
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

export default Movies;
