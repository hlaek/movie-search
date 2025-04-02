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