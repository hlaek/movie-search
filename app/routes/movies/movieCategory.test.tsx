import { render, screen } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router";
import { describe, test, expect, vi, beforeEach } from "vitest";
import MovieListSearch from "./movieCategory";
import { MovieCategory } from "~/type";
import type { MovieResults } from "~/type";
import type { Route } from "../../+types/root";

vi.mock("~/services/moviedb", () => ({
  fetchMovies: vi.fn().mockResolvedValue([
    {
      id: 1,
      original_title: "Test Movie",
      release_date: "2024-01-01",
      poster_path: "/test.jpg",
      original_language: "en",
      adult: false,
      vote_average: 8.5,
      overview: "Test overview",
      backdrop_path: "/test.jpg",
      genre_ids: [1, 2, 3],
      popularity: 100,
      video: false,
      vote_count: 100,
      title: "Test Movie",
    },
  ]),
}));

const mockMovies: MovieResults[] = [
  {
    id: 1,
    original_title: "Test Movie",
    release_date: "2024-01-01",
    poster_path: "/test.jpg",
    original_language: "en",
    adult: false,
    vote_average: 8.5,
    overview: "Test overview",
    backdrop_path: "/test.jpg",
    genre_ids: [1, 2, 3],
    popularity: 100,
    video: false,
    vote_count: 100,
    title: "Test Movie",
  },
];

describe("MovieListSearch Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const renderComponent = (props: Partial<Route.ComponentProps> = {}) => {
    const defaultProps: Route.ComponentProps = {
      loaderData: mockMovies as unknown as Route.ComponentProps["loaderData"],
      params: { movieCategory: MovieCategory.POPULAR },
      matches: [
        {
          id: "root",
          pathname: "/movies/type/popular",
          params: { movieCategory: MovieCategory.POPULAR },
          data: [] as unknown as Route.ComponentProps["loaderData"],
          handle: {},
        },
      ],
    };

    const mergedProps = { ...defaultProps, ...props };

    const routes = [
      {
        path: "/movies/type/:movieCategory",
        element: <MovieListSearch {...mergedProps} />,
      },
    ];

    const router = createMemoryRouter(routes, {
      initialEntries: ["/movies/type/popular"],
    });

    return render(<RouterProvider router={router} />);
  };

  test("renders movie list with data", async () => {
    renderComponent();

    expect(await screen.findByText("Test Movie")).toBeInTheDocument();

    expect(await screen.findByText("2024-01-01")).toBeInTheDocument();

    expect(await screen.findByText("POPULAR")).toBeInTheDocument();
  });

  test("renders no movies found message when data is empty", async () => {
    renderComponent({
      loaderData: [] as unknown as Route.ComponentProps["loaderData"],
    });

    expect(screen.getByText("No movies found")).toBeInTheDocument();
  });

  test("renders movie card with correct details", async () => {
    renderComponent();

    expect(await screen.findByText("en")).toBeInTheDocument();
    expect(await screen.findByText("No")).toBeInTheDocument();
    expect(await screen.findByText("8.5/10")).toBeInTheDocument();
    expect(await screen.findByText("Test overview")).toBeInTheDocument();

    const viewDetailsLink = await screen.findByText("View Details");
    expect(viewDetailsLink).toBeInTheDocument();
    expect(viewDetailsLink.closest("a")).toHaveAttribute("href", "/movies/1");
  });

  test("formats movie category correctly in title", async () => {
    renderComponent({
      params: { movieCategory: MovieCategory.COMING_SOON },
      matches: [
        {
          id: "root",
          pathname: "/movies/type/coming-soon",
          params: { movieCategory: MovieCategory.COMING_SOON },
          data: [] as unknown as Route.ComponentProps["loaderData"],
          handle: {},
        },
      ],
    });

    expect(await screen.findByText("COMING SOON")).toBeInTheDocument();
  });
});
