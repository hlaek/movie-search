import {
  type RouteConfig,
  index,
  prefix,
  route,
} from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  ...prefix("movies", [
    route("type/:movieCategory", "routes/movies/movieCategory.tsx"),
    route(":movieId", "routes/movies/movieDetails.tsx"),
  ]),
] satisfies RouteConfig;
