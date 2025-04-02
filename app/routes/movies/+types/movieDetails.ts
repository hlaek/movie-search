import type { MovieDetails } from "~/type";

export namespace Route {
  export interface ComponentProps {
    loaderData: unknown;
    params: {
      movieId: string;
    };
    matches: Array<{
      id: string;
      pathname: string;
      params: { movieId: string };
      data: unknown;
      handle: Record<string, unknown>;
    }>;
  }

  export interface MetaArgs {
    params: {
      movieId: string;
    };
  }

  export interface LoaderArgs {
    params: {
      movieId: string;
    };
  }
} 