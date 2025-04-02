import { render, screen } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router";
import { describe, test, expect, vi, beforeEach } from "vitest";
import type { MovieDetails } from "~/type";
import type { Route } from "./+types/movieDetails";
import MovieDetailsRoute from "./movieDetails";
import { fetchWatchProviders } from "~/services/moviedb";

vi.mock("~/services/moviedb", () => {
  return {
    fetchMovieDetails: vi.fn().mockImplementation(() => {
      return Promise.resolve({
        id: 1,
        original_title: "Test Movie",
        release_date: "2024-01-01",
        revenue: 1000000,
        runtime: 120,
        budget: 32,
        genres: [
          { id: 1, name: "Action" },
          { id: 2, name: "Adventure" },
          { id: 3, name: "Comedy" },
        ],
        homepage: "https://www.test.com",
        imdb_id: "1343",
        original_language: "en",
        overview: "Test movie overview",
        popularity: 8,
        poster_path: "/test-poster.jpg",
        production_companies: [
          {
            id: 1,
            name: "Test Company",
            logo_path: "/path",
            origin_country: "EN",
          },
        ],
        production_countries: [{ iso_3166_1: "US", name: "United States" }],
        spoken_languages: [
          {
            iso_639_1: "en",
            name: "English",
            english_name: "English",
          },
        ],
        status: "Released",
        tagline: "Test tagline",
        title: "Movie Title",
        video: false,
        vote_average: 12,
        vote_count: 234,
        adult: false,
        backdrop_path: "/test-backdrop.jpg",
        belongs_to_collection: null,
      });
    }),
  };
});

// Define mock data after the mock
const mockMovieDetails: MovieDetails = {
  id: 1,
  original_title: "Test Movie",
  release_date: "2024-01-01",
  revenue: 1000000,
  runtime: 120,
  budget: 32,
  genres: [
    { id: 1, name: "Action" },
    { id: 2, name: "Adventure" },
    { id: 3, name: "Comedy" },
  ],
  homepage: "https://www.test.com",
  imdb_id: "1343",
  original_language: "en",
  overview: "Test movie overview",
  popularity: 8,
  poster_path: "/test-poster.jpg",
  production_companies: [
    { id: 1, name: "Test Company", logo_path: "/path", origin_country: "EN" },
  ],
  production_countries: [{ iso_3166_1: "US", name: "United States" }],
  spoken_languages: [
    {
      iso_639_1: "en",
      name: "English",
      english_name: "English",
    },
  ],
  status: "Released",
  tagline: "Test tagline",
  title: "Movie Title",
  video: false,
  vote_average: 12,
  vote_count: 234,
  adult: false,
  backdrop_path: "/test-backdrop.jpg",
  belongs_to_collection: null,
};

describe("MovieDetails Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const renderComponent = (props: Partial<Route.ComponentProps> = {}) => {
    const defaultProps: Route.ComponentProps = {
      loaderData:
        mockMovieDetails as unknown as Route.ComponentProps["loaderData"],
      params: { movieId: "1" },
      matches: [
        {
          id: "root",
          pathname: "/movies/1",
          params: { movieId: "1" },
          data: mockMovieDetails,
          handle: {},
        },
      ],
    };

    const mergedProps = { ...defaultProps, ...props };

    const routes = [
      {
        path: "/movies/:movieId",
        element: <MovieDetailsRoute {...mergedProps} />,
      },
    ];

    const router = createMemoryRouter(routes, {
      initialEntries: ["/movies/1"],
    });

    return render(<RouterProvider router={router} />);
  };

  test("renders movie details correctly", async () => {
    renderComponent();

    expect(await screen.findByText("Movie Title")).toBeInTheDocument();
    expect(
      await screen.findByText(
        "Original Title: " + mockMovieDetails.original_title
      )
    ).toBeInTheDocument();
    expect(await screen.findByText("Test movie overview")).toBeInTheDocument();
    expect(await screen.findByText("Test movie overview")).toBeInTheDocument();
    expect((await screen.findByTestId("revenue")).textContent).toBe(
      "Revenue: $1,000,000"
    );
    expect((await screen.findByTestId("runtime")).textContent).toBe(
      "Runtime: 120 minutes"
    );
  });

  test("renders no movie details found message when data is empty", async () => {
    renderComponent({
      loaderData: null as unknown as Route.ComponentProps["loaderData"],
    });

    expect(screen.getByText("No movie details found")).toBeInTheDocument();
  });

  test("do not show original title if same as test", async () => {
    renderComponent({
      loaderData: { ...mockMovieDetails, original_title: "Movie Title" },
    });

    expect(
      screen.queryByText("Original Title: " + mockMovieDetails.original_title)
    ).not.toBeInTheDocument();
  });
});
