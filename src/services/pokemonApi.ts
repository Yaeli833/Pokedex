import { default as axios, AxiosInstance } from 'axios';
import { PokemonListItem, PokemonResponse, PokemonDetail } from '../types/pokemon';

const API_BASE_URL = 'https://pokeapi.co/api/v2';

const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

export const pokemonApi = {
  // Obtener lista de Pokémon
  async getPokemonList(limit: number = 20, offset: number = 0): Promise<PokemonListItem[]> {
    try {
      const response = await apiClient.get<PokemonResponse>('/pokemon', {
        params: { limit, offset },
      });

      const pokemonList = response.data.results.map((pokemon) => {
        const id = pokemon.url
          .split('/')
          .filter(Boolean)
          .pop();
        return {
          id: parseInt(id || '0', 10),
          name: pokemon.name,
          image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
        };
      });

      return pokemonList;
    } catch (error) {
      console.error('Error fetching Pokemon list:', error);
      throw error;
    }
  },

  // Buscar Pokémon por nombre
  async searchPokemon(name: string): Promise<PokemonListItem | null> {
    try {
      const response = await apiClient.get<PokemonDetail>(`/pokemon/${name.toLowerCase()}`);
      return {
        id: response.data.id,
        name: response.data.name,
        image: response.data.sprites.other['official-artwork'].front_default,
      };
    } catch {
      return null;
    }
  },

  // Obtener tipos de Pokémon
  async getPokemonTypes(): Promise<string[]> {
    try {
      const response = await apiClient.get('/type');
      return response.data.results.map((type: any) => type.name);
    } catch {
      return [];
    }
  },

  // Obtener Pokémon por tipo
  async getPokemonByType(type: string): Promise<PokemonListItem[]> {
    try {
      const response = await apiClient.get(`/type/${type}`);
      return response.data.pokemon.slice(0, 20).map((p: any) => {
        const id = p.pokemon.url.split('/').filter(Boolean).pop();
        return {
          id: parseInt(id || '0', 10),
          name: p.pokemon.name,
          image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
        };
      });
    } catch {
      return [];
    }
  },

  // Obtener detalle de Pokémon por id o nombre
  async getPokemonDetail(idOrName: string | number): Promise<PokemonDetail> {
    try {
      const response = await apiClient.get<PokemonDetail>(`/pokemon/${idOrName}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching Pokemon detail:', error);
      throw error;
    }
  },
};
