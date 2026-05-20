import { useState, useEffect, useCallback } from 'react';
import { favoritesService } from '../services/favoritesService';

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<number[]>([]);

  const loadFavorites = useCallback(async () => {
    const favs = await favoritesService.getFavorites();
    setFavorites(favs);
  }, []);

  const toggleFavorite = useCallback(async (pokemonId: number) => {
    const isFav = favorites.includes(pokemonId);
    if (isFav) {
      await favoritesService.removeFavorite(pokemonId);
      setFavorites(prev => prev.filter(id => id !== pokemonId));
    } else {
      await favoritesService.addFavorite(pokemonId);
      setFavorites(prev => [...prev, pokemonId]);
    }
  }, [favorites]);

  const isFavorite = useCallback((pokemonId: number) => {
    return favorites.includes(pokemonId);
  }, [favorites]);

  useEffect(() => {
    loadFavorites();
  }, [loadFavorites]);

  return { favorites, toggleFavorite, isFavorite };
};