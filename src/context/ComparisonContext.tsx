import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { pokemonApi } from '../services/pokemonApi';
import { PokemonDetail } from '../types/pokemon';

type Slot = 1 | 2;

type ComparisonContextValue = {
  pokemon1: PokemonDetail | null;
  pokemon2: PokemonDetail | null;
  loading: boolean;
  addPokemonToComparison: (pokemonId: number, slot: Slot) => Promise<void>;
  clearComparison: () => void;
  removePokemon: (slot: Slot) => void;
};

const ComparisonContext = createContext<ComparisonContextValue | undefined>(undefined);

export const ComparisonProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [pokemon1, setPokemon1] = useState<PokemonDetail | null>(null);
  const [pokemon2, setPokemon2] = useState<PokemonDetail | null>(null);
  const [loading, setLoading] = useState(false);

  const addPokemonToComparison = useCallback(async (pokemonId: number, slot: Slot) => {
    setLoading(true);
    try {
      const data = await pokemonApi.getPokemonDetail(pokemonId);
      if (slot === 1) setPokemon1(data);
      else setPokemon2(data);
    } finally {
      setLoading(false);
    }
  }, []);

  const clearComparison = useCallback(() => {
    setPokemon1(null);
    setPokemon2(null);
  }, []);

  const removePokemon = useCallback((slot: Slot) => {
    if (slot === 1) setPokemon1(null);
    else setPokemon2(null);
  }, []);

  const value = useMemo(
    () => ({
      pokemon1,
      pokemon2,
      loading,
      addPokemonToComparison,
      clearComparison,
      removePokemon,
    }),
    [pokemon1, pokemon2, loading, addPokemonToComparison, clearComparison, removePokemon]
  );

  return <ComparisonContext.Provider value={value}>{children}</ComparisonContext.Provider>;
};

export const useComparisonContext = () => {
  const ctx = useContext(ComparisonContext);
  if (!ctx) throw new Error('useComparisonContext must be used within ComparisonProvider');
  return ctx;
};

