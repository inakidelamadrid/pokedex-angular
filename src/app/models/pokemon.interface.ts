export interface Pokemon {
    id: number;
    name: string;
    sprites: {
      front_default: string;
    };
    types: {
      type: {
        name: string;
      };
    }[];
  }


  export interface PokemonResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: {
      name: string;
      url: string;
    }[];
  }