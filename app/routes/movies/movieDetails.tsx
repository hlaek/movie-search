import { fetchMovieDetails } from "~/services/moviedb";
import type { Route } from "./+types/movieDetails";
import { useParams } from "react-router";
import type { MovieDetails, MovieDetails } from "~/type";

export async function loader({ params }: Route.ClientLoaderArgs) {
  const id = Number(params.movieId);

  try {
    if (!id) {
      throw new Error("Movie id is required");
    }

    const response: MovieDetails = await fetchMovieDetails(id);
    if (!response) {
      throw new Error("Failed to fetch details");
    }
    return response;
  } catch (error) {
    console.error("Error loading movies:", error);
    return [];
  }
}

export default function MovieDetailsRoute({
  loaderData,
}: Route.ComponentProps) {
  const movieDetails: MovieDetails = loaderData as unknown as MovieDetails;

  if (!movieDetails) {
    return <div>No movie details found</div>;
  }

  return (
    <div className="movies-list">
      <div className="flex flex-row ...">
        <div key={movieDetails.id} className="movie-card">
          <img
            src={`https://image.tmdb.org/t/p/w500${movieDetails.backdrop_path}`}
            alt={movieDetails.original_title}
          />
          <h1>{movieDetails.original_title}</h1>
          <h4>{movieDetails.release_date}</h4>
          <p>{movieDetails.overview}</p>

          <h5>Where to Watch</h5>
        </div>
      </div>
    </div>
  );
}
