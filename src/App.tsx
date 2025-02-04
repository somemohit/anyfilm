import './App.css';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Movies from './pages/Movies';
import Search from './pages/Search';
import TvShows from './pages/TvShows';
import {Route, Routes} from 'react-router-dom';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="movies" element={<Movies />} />
        <Route path="tvshows" element={<TvShows />} />
        <Route path="tvshows" element={<TvShows />} />
        <Route path="search" element={<Search />} />
      </Routes>
    </>
  );
}

export default App;
