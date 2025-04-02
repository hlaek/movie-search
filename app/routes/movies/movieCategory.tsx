import { Link, useParams } from "react-router";
import { fetchMovies } from "~/services/moviedb";
import type { Route } from "../../+types/root";
import { MovieCategory, type MovieResults, type Movies } from "~/type";
import MovieCategoryCard from "~/components/MovieCategoryCard";

export function meta({ params }: Route.MetaArgs) {
  const movieCategory = params.movieCategory as MovieCategory;

  return [
    { title: "Movie Category List" },
    { name: movieCategory, content: "Movie Generator" },
  ];
}

export async function loader({ params }: Route.ClientLoaderArgs) {
  const movieCategory = params.movieCategory as MovieCategory;

  try {
    if (!movieCategory) {
      throw new Error("Movie category is required");
    }

    const response = (await fetchMovies(movieCategory)) as MovieResults[];
    if (!response) {
      throw new Error("Failed to fetch movies");
    }
    return response;
  } catch (error) {
    console.error("Error loading movies:", error);
    return [];
  }
}

export default function MovieListSearch({
  loaderData,
  params,
}: Route.ComponentProps) {
  const movies: MovieResults[] = loaderData as unknown as MovieResults[];
  const movieCategory = params.movieCategory as MovieCategory;
  const formattedCategory = movieCategory.replace(/-/g, " ").toUpperCase();

  if (!movies || movies.length === 0) {
    return <div>No movies found</div>;
  }

  return (
    <div className="movies-list container m-auto p-4 max-w-300">
      <h1 className="uppercase">
        {params ? formattedCategory : "Movie Category"}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {movies.map((movie) => MovieCategoryCard({ movie }))}
      </div>
    </div>
  );
}
