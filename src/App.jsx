import React, { useState } from 'react';
import { Film } from 'lucide-react';
import SearchBar from './components/SearchBar';
import MovieList from './components/MovieList';
import MovieDetails from './components/MovieDetails';
import ErrorMessage from './components/ErrorMessage';
import { Skeleton } from './components/Loader';

const API_KEY = 'f9d9dfb9';
const API_URL = 'https://www.omdbapi.com/';
console.log('API KEY:', API_KEY);
console.log('Full URL:', `${API_URL}?apikey=${API_KEY}&s=test`);

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);

  const searchMovies = async (query) => {
    if (!query.trim()) return;

    setLoading(true);
    setError('');
    setHasSearched(true);

    try {
      const response = await fetch(`${API_URL}?apikey=${API_KEY}&s=${query}`);
      const data = await response.json();

      if (data.Response === 'True') {
        setMovies(data.Search);
      } else {
        setMovies([]);
        setError(data.Error || 'No movies found');
      }
    } catch (err) {
      setError('Failed to fetch movies. Please try again.');
      setMovies([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    searchMovies(searchQuery);
  };

  const handleMovieClick = (movieId) => {
    setSelectedMovie(movieId);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
            YOURFILMBASE
          </h1>
          <p className="text-gray-400 text-lg">Search and explore thousands of movies</p>
        </header>

        <SearchBar 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onSearch={handleSearch}
        />

        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, index) => (
              <Skeleton key={index} />
            ))}
          </div>
        )}

        {!loading && error && <ErrorMessage message={error} />}

        {!loading && !error && movies.length > 0 && (
          <MovieList movies={movies} onMovieClick={handleMovieClick} />
        )}

        {!loading && !error && movies.length === 0 && hasSearched && (
          <ErrorMessage message="No movies found. Try a different search term." />
        )}

        {!loading && !hasSearched && (
          <div className="text-center py-16">
            <Film className="w-24 h-24 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400 text-xl">Start searching for your favorite movies!</p>
          </div>
        )}

        {selectedMovie && (
          <MovieDetails 
            movieId={selectedMovie} 
            onClose={() => setSelectedMovie(null)} 
          />
        )}
      </div>
    </div>
  );
};

export default App;