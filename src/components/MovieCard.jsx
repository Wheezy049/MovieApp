import React from "react";

function MovieCard({ movie }) {
  return (
    <div className="bg-white text-black rounded-lg shadow-lg transition-transform duration-300 hover:scale-105 cursor-pointer">
      {/* Movie Poster */}
      <div className="w-full flex justify-center">
        <img
          src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
          alt={movie.title}
          className="w-full rounded-t-lg"
        />
      </div>

      {/* Movie Details */}
      <div className="mt-4 p-3 space-y-2 w-full">
        <h3 className="text-lg font-bold">{movie.title}</h3>
        <div className="flex items-center space-x-2">
          <p className="text-black text-sm">
            ⭐ {movie.vote_average.toFixed(1)}
          </p>
          <span>•</span>
          <p className="text-black text-sm">
            {movie.original_language.toUpperCase()}
          </p>
          <span>•</span>
          <p className="text-black text-sm">
            {movie.release_date.split("-")[0]}
          </p>
        </div>
      </div>

    </div>
  );
}

export default MovieCard;
