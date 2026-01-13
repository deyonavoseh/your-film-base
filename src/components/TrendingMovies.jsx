import { useEffect, useState } from "react";

const API_KEY = 'f9d9dfb9';
const API_URL = 'https://www.omdbapi.com/';
function TrendingMovies() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(TRENDING_URL)
      .then((res) => res.json())
      .then((data) => {
        setMovies(data.results || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-center">Loading trending movies...</p>;

  return (
    <section className="mt-10">
      <h2 className="text-2xl font-bold mb-4 text-white">
        🔥 Trending Movies
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {movies.map((movie) => (
          <div key={movie.id} className="bg-gray-800 rounded-lg overflow-hidden">
            <img
              src={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                  : "/no-image.png"
              }
              alt={movie.title}
              className="w-full h-64 object-cover"
            />
            <div className="p-2">
              <h3 className="text-sm font-semibold text-white">
                {movie.title}
              </h3>
              <p className="text-xs text-gray-400">
                ⭐ {movie.vote_average}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default TrendingMovies;
