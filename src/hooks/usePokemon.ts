import { useCallback, useEffect, useState } from 'react';
import { pokemonApi } from '../services/pokemonApi';
import { PokemonDetail, PokemonListItem } from '../types/pokemon';

export const usePokemonList = () => {
  const [pokemonList, setPokemonList] = useState<PokemonListItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPokemonList = useCallback(async (limit = 20, offset = 0) => {
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
  }, []);

  useEffect(() => {
    fetchPokemonList(20);
  }, [fetchPokemonList]);

  return { pokemonList, loading, error, fetchPokemonList };
};

export const usePokemonDetail = (idOrName: string | number) => {
  const [pokemonDetail, setPokemonDetail] = useState<PokemonDetail | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPokemonDetail = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await pokemonApi.getPokemonDetail(idOrName);
      setPokemonDetail(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error fetching Pokemon detail');
    } finally {
      setLoading(false);
    }
  }, [idOrName]);

  useEffect(() => {
    if (idOrName !== undefined && idOrName !== null && idOrName !== '') {
      fetchPokemonDetail();
    }
  }, [idOrName, fetchPokemonDetail]);

  return { pokemonDetail, loading, error, refetch: fetchPokemonDetail };
};

