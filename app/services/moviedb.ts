import { MovieCategory } from "~/type";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.API_KEY}`,
  },
};

export const fetchMovies = async (
  category: MovieCategory
): Promise<[] | null> => {
  const categoryMap = {
    [MovieCategory.POPULAR]: "popular",
    [MovieCategory.NEW]: "now_playing",
    [MovieCategory.COMING_SOON]: "upcoming",
  };

  try {
    const movies: [] = await fetch(
      `${process.env.API_URL}/3/movie/${categoryMap[category]}?language=en-US&page=1`,
      options
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        return data.results;
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });

    if (!movies) {
      throw new Error("No movies found");
    }

    return movies;
  } catch (error) {
    console.error(`Error fetching ${category} movies:`, error);
  }
  return null;
};

export const fetchMovieDetails = async (
  movieId: number
): Promise<null | any> => {
  try {
    if (!movieId) {
      throw new Error("Movie ID is required");
    }
    const movieDetails = await fetch(
      `${process.env.API_URL}/3/movie/${movieId}?language=en-US`,
      options
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
    if (!movieDetails) {
      throw new Error("No movie details found");
    }

    return movieDetails;
  } catch (error) {
    console.error("Error fetching movie details:", error);
  }
  return null;
};
