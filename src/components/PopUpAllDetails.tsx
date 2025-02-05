import {useEffect, useState} from 'react';
import {apiToken, imgLink} from '../modules/ApiLinks';
import axios from 'axios';
import moment from 'moment';
import {Triangle} from 'react-loader-spinner';
import {
  MovieCreditDetails,
  MovieDetails,
  PopUpAllDetailsProps,
} from '../modules/types_file';

const PopUpAllDetails: React.FC<PopUpAllDetailsProps> = ({
  contentDetailsEndpoint,
  contentCreditDetailsEndpoint,
}) => {
  const [movieAllDetails, setMovieAllDetails] = useState<MovieDetails>();
  const [movieCreditDetails, setMovieCreditDetails] =
    useState<MovieCreditDetails>();
  const [loading, setLoading] = useState(true);

  const getMovieData = async () => {
    const url = contentDetailsEndpoint;
    setLoading(true);
    try {
      const response = await axios.get(`${url}`, {
        headers: {
          Authorization: `Bearer ${apiToken}`,
        },
      });
      setMovieAllDetails(response?.data);
      setLoading(false);
      console.log(response, 'responsehhh');
    } catch (error) {
      setLoading(false);
      console.error('Error fetching data:', error);
    }
  };

  const getMovieCredits = async () => {
    const url = contentCreditDetailsEndpoint;
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

  useEffect(() => {
    getMovieData();
    getMovieCredits();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div>
        {movieAllDetails && (
          <div className="">
            <img
              src={`${
                movieAllDetails?.backdrop_path
                  ? `${imgLink}${movieAllDetails?.backdrop_path}`
                  : 'no-img.jpg'
              }`}
              className="w-full object-cover object-center rounded-lg h-56 sm:h-64 md:h-72 lg:h-[380px]"
              alt="movie-img"
            />
            <div className="font-anton tracking-wider uppercase text-3xl sm:text-4xl font-bold text-red-500 pt-4">
              {movieAllDetails?.title || movieAllDetails?.name}
            </div>
            <div className="flex flex-col sm:flex-row justify-start sm:justify-between items-start sm:items-center gap-2 sm:gap-1 pt-2 pb-4">
              <div>
                <p className="text-base font-semibold pb-2 text-white">
                  {movieAllDetails?.tagline}
                </p>
                <div className="flex items-center gap-1 text-sm">
                  <p className="text-white text-sm">Genres:</p>
                  {movieAllDetails?.genres?.map(
                    (item: {id: string; name: string}) => {
                      return (
                        <p
                          className="bg-gray-700 text-white rounded-full px-2 py-1 text-xs"
                          key={item.id}
                        >
                          {item?.name}
                        </p>
                      );
                    }
                  )}
                </div>
              </div>
              <div>
                {movieAllDetails?.runtime ? (
                  <p className="text-sm font-semibold pb-2 text-white">
                    {movieAllDetails?.runtime} minutes
                  </p>
                ) : null}
                {movieAllDetails?.number_of_episodes ? (
                  <p className="text-sm font-semibold pb-2 text-white">
                    {movieAllDetails?.number_of_episodes} Episodes
                  </p>
                ) : null}
                <p className="text-sm font-semibold text-white">
                  {moment(movieAllDetails.release_date).format('MMMM Do YYYY')}
                </p>
              </div>
            </div>
            <div className="text-xs sm:text-sm text-white">
              {movieAllDetails?.overview}
            </div>
          </div>
        )}

        {movieAllDetails?.vote_average && (
          <div className="flex justify-start items-center gap-2 pt-2">
            <div className="text-white">IMDB Rating: </div>
            <div className="border rounded-md bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 px-3 py-1 text-xs text-white">
              {movieAllDetails?.vote_average.toFixed(1)}{' '}
            </div>
          </div>
        )}

        {movieCreditDetails?.cast?.length ? (
          <div className="py-4">
            <p className="font-anton tracking-wider uppercase text-white text-3xl text-center pb-2">
              Cast
            </p>
            <div className="flex flex-wrap justify-center items-start gap-2">
              {movieCreditDetails?.cast
                ?.slice(0, 20)
                .map(
                  (item: {
                    credit_id: string;
                    profile_path: string;
                    name: string;
                    character: string;
                  }) => {
                    return (
                      <div
                        className="w-20 flex flex-col justify-center items-center"
                        key={item?.credit_id}
                      >
                        <img
                          src={`${
                            item?.profile_path
                              ? `${imgLink}${item?.profile_path}`
                              : 'no-img.jpg'
                          }`}
                          className="w-12 sm:w-16 md:w-16 lg:w-16 object-cover object-center border-2 rounded-full h-12 sm:h-16 md:h-16 lg:h-16"
                          alt="movie-img"
                        />{' '}
                        <div className="text-center flex flex-col justify-center items-center gap-1">
                          <p className="text-sm text-white">{item?.name}</p>
                          <p className="text-xs text-gray-200">
                            {item?.character}
                          </p>
                        </div>
                      </div>
                    );
                  }
                )}
            </div>
          </div>
        ) : null}
      </div>

      {loading && (
        <div className="flex justify-center items-center">
          <Triangle
            visible={true}
            height="80"
            width="80"
            color="#4fa94d"
            ariaLabel="triangle-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
        </div>
      )}
    </>
  );
};

export default PopUpAllDetails;
