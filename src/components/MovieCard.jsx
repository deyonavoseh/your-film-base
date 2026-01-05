import React from 'react';
import { Calendar, Film } from 'lucide-react';

const MovieCard = ({ movie, onClick }) => {
  return (
    <div 
      onClick={() => onClick(movie.imdbID)}
      className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:scale-105"
    >
      <div className="relative h-96">
        {movie.Poster !== 'N/A' ? (
          <img 
            src={movie.Poster} 
            alt={movie.Title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gray-700 flex items-center justify-center">
            <Film className="w-16 h-16 text-gray-500" />
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-white font-semibold text-lg mb-2 line-clamp-2">
          {movie.Title}
        </h3>
        <div className="flex items-center text-gray-400 text-sm">
          <Calendar className="w-4 h-4 mr-1" />
          <span>{movie.Year}</span>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;