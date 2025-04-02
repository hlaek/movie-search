import { Link } from "react-router";
import type { MovieResults } from "~/type";

// compnat that takes a movie object and returns a card with the movie details
const MovieCategoryCard = ({ movie }: { movie: MovieResults }) => {
  return (
    <div
      key={movie.id}
      className="movie-card card m-2 flex flex-col justify-items-start"
    >
      <div className="movie-card__title bg-pink-300 p-4 rounded-t-lg">
        <h5 className="movie-card__subheading leading-0 font-bold">
          {movie.release_date}
        </h5>
        <h4 className="movie-card__heading h4 font-extrabold">
          {movie.original_title}
        </h4>
      </div>
      <div className="movie-card__rating flex justify-between flex-row items-center mt-auto font-sans">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.original_title}
          className="movie-poster w-40 relative"
        />
        <div className="movie-card__rating flex justify-between flex-col items-cente pr-6">
          <span className="text-md font-sans">
            Language:{" "}
            <span className="uppercase">{movie.original_language}</span>
          </span>
          <span className="text-md font-sans">
            Adult: <span>{movie.adult ? "Yes" : "No"}</span>
          </span>
          <span className="text-md font-sans">
            Rating: <span>{movie.vote_average}/10</span>
          </span>
        </div>
      </div>
      <div className="movie-card__description px-6 pt-2 flex flex-col justify-between gap-1.5 h-full">
        <p className="mb-3 line-clamp-4">{movie.overview}</p>
      </div>
      <Link
        to={`/movies/${movie.id}`}
        className="view-details-button btn btn-secondary justify-self-end mt-auto"
      >
        View Details
      </Link>
    </div>
  );
};
export default MovieCategoryCard;
