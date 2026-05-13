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
