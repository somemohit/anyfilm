import axios from 'axios';
import {useEffect, useState} from 'react';
import {useLocation} from 'react-router-dom';
import {
  apiToken,
  imgLink,
  movieCredits,
  movieDetails,
  search,
  tvShowCredits,
  tvShowDetails,
} from '../modules/ApiLinks';
import Loader from '../components/Loader';
import moment from 'moment';
import ModalComponent from '../components/ModalComponent';
import PopUpAllDetails from '../components/PopUpAllDetails';

const Search = () => {
  const [searchData, setSearchData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);
  const [openModal, setOpenModal] = useState(false);
  const [contentId, setContentId] = useState('');

  const location = useLocation();
  const queryParam = new URLSearchParams(location.search);
  const searchParam = queryParam.get('q');
  const category: string = 'movie';

  console.log(searchParam, 'searchParam');

  const handleSearchApiCall = async () => {
    setLoading(true);
    try {
      const response = await axios.get(search, {
        headers: {
          Authorization: `Bearer ${apiToken}`,
        },
        params: {query: searchParam},
      });
      setSearchData(response?.data?.results);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  const handleDisplayCardClick = (id: string) => {
    setOpenModal(true);
    setContentId(id);
  };

  useEffect(() => {
    handleSearchApiCall();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParam]);

  console.log(error, 'error');

  return (
    <>
      {searchData?.length ? (
        <>
          <div className="bg-gray-900 h-fit min-h-screen flex flex-wrap justify-center items-start gap-4 sm:gap-12 pt-32 sm:pt-24 max-w-full mx-auto px-2 sm:px-8 py-8">
            {searchData?.map(
              (item: {
                id: string;
                poster_path: string;
                vote_average: number;
                title: string;
                name: string;
                release_date: string;
              }) => {
                return (
                  <div
                    key={item?.id}
                    onClick={() => handleDisplayCardClick(item?.id)}
                    className="relative cursor-pointer hover:border-2 rounded-lg shadow-xl bg-gray-800 h-fit w-[150px] sm:w-[200px] md:w-[220px] lg:w-[260px] hover:scale-110 ease-in-out duration-300"
                  >
                    <img
                      src={`${
                        item?.poster_path
                          ? `${imgLink}${item?.poster_path}`
                          : 'no-img.jpg'
                      }`}
                      className="w-full object-cover object-center rounded-lg h-56 sm:h-64 md:h-72 lg:h-[380px]"
                      alt="search-img"
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
              }
            )}
          </div>
        </>
      ) : (
        <div className="bg-gray-900 flex flex-col justify-center items-center h-screen">
          <p className="text-xl sm:text-3xl font-bold text-white text-center">
            Sorry, no results found. Please check spelling and try again.
          </p>
          <img
            src="noresults.png"
            className="w-4/5 sm:w-1/3 h-auto object-cover object-center rounded-lg"
            alt="movie-img"
          />
        </div>
      )}

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

export default Search;
