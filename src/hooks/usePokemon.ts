import { useState, useEffect } from 'react';
import { pokemonApi } from '../services/pokemonApi';
import { PokemonListItem } from '../types/pokemon';

export const usePokemonList = () => {
  const [pokemonList, setPokemonList] = useState<PokemonListItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPokemonList = async (limit = 20, offset = 0) => {
    try {
      setLoading(true);
      setError(null);
      const data = await pokemonApi.getPokemonList(limit, offset);
      setPokemonList(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error fetching Pokemon');
    } finally {
      setLoading(false);
    }
  };

  return { pokemonList, loading, error, fetchPokemonList };
};

