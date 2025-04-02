import { fetchMovieDetails } from "~/services/moviedb";
import type { Route } from "./+types/movieDetails";
import type { MovieDetails } from "~/type";
import { MovieDetailsCard } from "~/components/MovieDetailsCard";

export function meta({ params }: Route.MetaArgs) {
  const movieId = params.movieId;

  return [
    { title: "Movie Details" },
    { name: movieId, content: "Description" },
  ];
}

export async function loader({ params }: Route.LoaderArgs) {
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
        <MovieDetailsCard movieDetails={movieDetails} />
      </div>
    </div>
  );
}
