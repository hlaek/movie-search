import { useEffect } from "react";
import { Link } from "react-router";
import type { MovieDetails, MovieResults } from "~/type";

export const MovieDetailsCard = ({
  movieDetails,
}: {
  movieDetails: MovieDetails;
}) => {
  return (
    <div
      key={movieDetails.id}
      className="movie-card flex flex-col items-start max-w-300"
    >
      <img
        src={`https://image.tmdb.org/t/p/w500${movieDetails.backdrop_path}`}
        alt={movieDetails.title}
      />
      <h1>{movieDetails.title}</h1>
      <p className="text-md font-sans2 pb-6">{movieDetails.overview}</p>

      <ul>
        {movieDetails.original_title !== movieDetails.title && (
          <li>Original Title: {movieDetails.original_title}</li>
        )}
        <li data-testid="runtime">Runtime: {movieDetails.runtime} minutes</li>
        <li>Release Date: {movieDetails.release_date}</li>
        <li data-testid="revenue">
          Revenue:{" "}
          {movieDetails.revenue > 0
            ? `$${movieDetails.revenue.toLocaleString()}`
            : "N/A"}
        </li>
      </ul>

      <div className="flex flex-col items-start bg-pink-300 p-4 rounded-t-lg w-full">
        <h5>Where to Watch</h5>
      </div>
      <div className="flex flex-col items-start bg-white p-4 rounded-b-lg w-full"></div>
    </div>
  );
};
