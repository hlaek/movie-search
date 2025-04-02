export interface Movies {
  dates: {
    maximum: string;
    minimum: string;
  };
  page: number;
  results: MovieResults[];
  total_pages: number;
  total_results: number;
}

export interface MovieResults {
  adult: boolean;
  backdrop_path: string | null;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export enum MovieCategory {
  POPULAR = "popular",
  NEW = "new",
  COMING_SOON = "coming-soon",
}

export interface MovieDetails {
  adult: boolean;
  backdrop_path: string | null;
  belongs_to_collection: string | null;
  budget: number;
  genres: Genre[];
  homepage: string | null;
  id: number;
  imdb_id: string | null;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: SpokenLanguage[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

interface Genre {
  id: number;
  name: string;
}

interface ProductionCompany {
  id: number;
  logo_path: string | null;
  name: string;
  origin_country: string;
}

interface ProductionCountry {
  iso_3166_1: string;
  name: string;
}

interface SpokenLanguage {
  english_name: string;
  iso_639_1: string;
  name: string;
}

export interface WatchProviders {
  US: USProviders;
}

interface USProviders {
  link: string;
  rent: Provider[];
  flatrate: Provider[];
  buy: Provider[];
}

export interface Provider {
  logo_path: string;
  provider_id: number;
  provider_name: string;
  display_priority: number;
}

export namespace Route {
  export interface ComponentProps {
    loaderData: unknown;
    params: {
      movieCategory?: MovieCategory;
    };
    matches: Array<{
      id: string;
      pathname: string;
      params: { movieCategory?: MovieCategory };
      data: unknown;
      handle: Record<string, unknown>;
    }>;
  }

  export interface MetaArgs {
    params: {
      movieCategory?: MovieCategory;
    };
  }

  export interface ClientLoaderArgs {
    params: {
      movieCategory?: MovieCategory;
    };
  }
}
