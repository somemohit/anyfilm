export const apiToken =
  'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkODc4NmI1YTU1NDE1MWRlNTc4MGM1ZDI4Zjg2YzZkNyIsIm5iZiI6MTczNzk5MjEyMy45ODgsInN1YiI6IjY3OTdhN2JiNzAyZjQ5MmY0NzhmNTYxYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.vuroknNk1oKU8uH2EY01TI85rdjFCjbSdb5a46jSC_o';

export const apiKey = 'd8786b5a554151de5780c5d28f86c6d7';

export const baseUrl = 'https://api.themoviedb.org/3';

export const imgLink = 'https://image.tmdb.org/t/p/original';

// movies endpoints
export const nowPlaying = `${baseUrl}/movie/now_playing?language=en-US&page=1`;
export const popular = `${baseUrl}/movie/popular`;
export const upcoming = `${baseUrl}/movie/upcoming`;
export const topRatedMovies = `${baseUrl}/movie/top_rated`;
export const search = `${baseUrl}/search/movie`;
export const movieDetails = (movie_id :string) => `${baseUrl}/movie/${movie_id}`;
export const movieCredits = (movie_id :string) => `${baseUrl}/movie/${movie_id}/credits`;

// tv shows endpoints
export const airingTodayShows = `${baseUrl}/tv/airing_today`;
export const popularShow = `${baseUrl}/tv/popular`;
export const onTheAirShows = `${baseUrl}/tv/on_the_air`;
export const topRatedShows = `${baseUrl}/tv/top_rated`;
