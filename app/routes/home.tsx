import { Link } from "react-router";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "What Should I Watch? " },
    { name: "description", content: "Movie Generator" },
  ];
}

export default function Home({}: Route.ComponentProps) {
  return (
    <section className="home-page container m-auto p-4 max-w-4xl flex flex-col items-center">
      <h1 className="h1">What Should I Watch?</h1>
      <h2 className="h2">Your app for movie recommendations.</h2>

      <h3 className="h3 pt-8 pb-4">Search by:</h3>
      <ul className="search-options grid md:grid-cols-3 gap-2 w-full">
        <li>
          <Link
            to={`/movies/type/new`}
            className="view-movies-button btn btn-primary"
          >
            New
          </Link>
        </li>
        <li>
          <Link
            to={`/movies/type/popular`}
            className="view-movies-button btn btn-primary"
          >
            Popular
          </Link>
        </li>
        <li>
          <Link
            to={`/movies/type/coming-soon`}
            className="view-movies-button btn btn-primary"
          >
            Coming Soon
          </Link>
        </li>
      </ul>
    </section>
  );
}
