export interface PokemonListItem {
  id: number;
  name: string;
  image: string;
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

export interface PokemonDetail {
  id: number;
  name: string;
  sprites: {
    front_default: string;
    other: {
      'official-artwork': {
        front_default: string;
      };
    };
  };
  types: {
    type: { name: string; };
  }[];
  weight: number;
  height: number;
  abilities: {
    ability: { name: string; };
  }[];
  stats: {
    base_stat: number;
    stat: { name: string; };
  }[];
}

export interface ComparisonData {
  pokemon1: PokemonDetail | null;
  pokemon2: PokemonDetail | null;
}
