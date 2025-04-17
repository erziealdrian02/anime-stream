import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import WatchPage from './pages/WatchPage';
import WatchMoviePage from './pages/WatchMoviePage';
import DetailsPage from './pages/DetailsPage';
import DetailsMoviePage from './pages/DetailsMoviePage';
import SearchPage from './pages/SearchPage';
import CategoryPage from './pages/CategoryPage';
import AnimeListPage from './pages/AnimeListPage';
import SchedulePage from './pages/SchedulePage';
import NewsPage from './pages/NewsPage';
import OngoingPage from './pages/OngoingPage';
import CompletePage from './pages/CompletePage';
import MoviePage from './pages/MoviePage';

function App() {
  return (
    <div className="bg-black text-white min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/watch/:id" element={<WatchPage />} />
          <Route path="/watch/movie/:id" element={<WatchMoviePage />} />
          <Route path="/details/:id" element={<DetailsPage />} />
          <Route path="/details/movie/:id" element={<DetailsMoviePage />} />
          {/* <Route path="/search" element={<SearchPage />} /> */}
          <Route path="/category/:genreId" element={<CategoryPage />} />
          <Route path="/ongoing" element={<OngoingPage />} />
          <Route path="/complete" element={<CompletePage />} />
          <Route path="/movie" element={<MoviePage />} />

          <Route path="/anime-list" element={<AnimeListPage />} />
          <Route path="/schedule" element={<SchedulePage />} />
          <Route path="/news" element={<NewsPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
