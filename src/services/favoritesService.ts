// Storage simple en memoria para favoritos
let favorites: number[] = [];

export const favoritesService = {
  async getFavorites(): Promise<number[]> {
    return [...favorites];
  },

  async addFavorite(pokemonId: number): Promise<void> {
    if (!favorites.includes(pokemonId)) {
      favorites.push(pokemonId);
    }
  },

  async removeFavorite(pokemonId: number): Promise<void> {
    favorites = favorites.filter(id => id !== pokemonId);
  },

  async isFavorite(pokemonId: number): Promise<boolean> {
    return favorites.includes(pokemonId);
  }
};