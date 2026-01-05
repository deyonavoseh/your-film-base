import React, { useState, useEffect } from 'react';
import { Star, Calendar, Clock, Film, X } from 'lucide-react';
import Loader from './Loader';
import ErrorMessage from './ErrorMessage';

const API_KEY = import.meta.env.VITE_OMDB_API_KEY;
const API_URL = 'https://www.omdbapi.com/';

const MovieDetails = ({ movieId, onClose }) => {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(`${API_URL}?apikey=${API_KEY}&i=${movieId}&plot=full`);
        const data = await response.json();
        setMovie(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching movie details:', error);
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
        <div className="bg-gray-900 rounded-lg p-8 max-w-4xl w-full">
          <Loader />
        </div>
      </div>
    );
  }

  if (!movie || movie.Response === 'False') {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
        <div className="bg-gray-900 rounded-lg p-8 max-w-4xl w-full">
          <ErrorMessage message="Failed to load movie details" />
          <button onClick={onClose} className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors w-full">
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-gray-900 rounded-lg max-w-4xl w-full my-8">
        <div className="relative">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 z-10 bg-black bg-opacity-50 p-2 rounded-full hover:bg-opacity-75 transition-all"
          >
            <X className="w-6 h-6 text-white" />
          </button>
          
          <div className="md:flex">
            <div className="md:w-1/3 p-6">
              {movie.Poster !== 'N/A' ? (
                <img 
                  src={movie.Poster} 
                  alt={movie.Title}
                  className="w-full rounded-lg shadow-lg"
                />
              ) : (
                <div className="w-full h-96 bg-gray-700 rounded-lg flex items-center justify-center">
                  <Film className="w-24 h-24 text-gray-500" />
                </div>
              )}
            </div>
            
            <div className="md:w-2/3 p-6">
              <h2 className="text-3xl font-bold text-white mb-4">{movie.Title}</h2>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {movie.Genre && movie.Genre.split(', ').map((genre, index) => (
                  <span key={index} className="px-3 py-1 bg-blue-600 text-white text-sm rounded-full">
                    {genre}
                  </span>
                ))}
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="flex items-center text-gray-300">
                  <Calendar className="w-5 h-5 mr-2 text-blue-500" />
                  <span>{movie.Year}</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <Clock className="w-5 h-5 mr-2 text-blue-500" />
                  <span>{movie.Runtime}</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <Star className="w-5 h-5 mr-2 text-yellow-500" />
                  <span>{movie.imdbRating}/10</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <span className="font-semibold mr-2">Rated:</span>
                  <span>{movie.Rated}</span>
                </div>
              </div>
              
              <div className="mb-4">
                <h3 className="text-xl font-semibold text-white mb-2">Plot</h3>
                <p className="text-gray-300 leading-relaxed">{movie.Plot}</p>
              </div>
              
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-white mb-2">Director</h3>
                <p className="text-gray-300">{movie.Director}</p>
              </div>
              
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-white mb-2">Cast</h3>
                <p className="text-gray-300">{movie.Actors}</p>
              </div>
              
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-white mb-2">Awards</h3>
                <p className="text-gray-300">{movie.Awards}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;