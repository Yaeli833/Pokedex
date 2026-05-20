import React, { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import PokemonCard from '../components/PokemonCard';
import SearchAndFilters from '../components/SearchAndFilters';
import { useFavorites } from '../hooks/useFavorites';
import { usePokemonList } from '../hooks/usePokemon';
import { pokemonApi } from '../services/pokemonApi';
import { PokemonListItem } from '../types/pokemon';

const PokemonListScreen: React.FC = () => {
  const { pokemonList, loading, error, fetchPokemonList } = usePokemonList();
  const { isFavorite, toggleFavorite } = useFavorites();
  const [refreshing, setRefreshing] = useState(false);
  const [filteredPokemon, setFilteredPokemon] = useState<PokemonListItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [searchLoading, setSearchLoading] = useState(false);

  useEffect(() => {
    setFilteredPokemon(pokemonList);
  }, [pokemonList]);

  const handleRefresh = async () => {
    setRefreshing(true);
    setSearchQuery('');
    setSelectedType(null);
    await fetchPokemonList(20);
    setRefreshing(false);
  };

  const handleSearch = useCallback(async (query: string) => {
    setSearchQuery(query);
    if (!query.trim()) {
      setFilteredPokemon(pokemonList);
      return;
    }

    setSearchLoading(true);
    try {
      const result = await pokemonApi.searchPokemon(query);
      setFilteredPokemon(result ? [result] : []);
    } catch {
      setFilteredPokemon([]);
    } finally {
      setSearchLoading(false);
    }
  }, [pokemonList]);

  const handleFilterByType = useCallback(async (type: string | null) => {
    setSelectedType(type);
    if (!type) {
      setFilteredPokemon(pokemonList);
      return;
    }

    setSearchLoading(true);
    try {
      const result = await pokemonApi.getPokemonByType(type);
      setFilteredPokemon(result);
    } catch {
      setFilteredPokemon([]);
    } finally {
      setSearchLoading(false);
    }
  }, [pokemonList]);

  const renderEmptyState = () => {
    if (searchQuery || selectedType) {
      return (
        <View style={styles.centerContainer}>
          <Text style={styles.emptyText}>No se encontraron Pokémon</Text>
          <Text style={styles.emptySubtext}>Intenta con otro nombre o tipo</Text>
        </View>
      );
    }
    return null;
  };

  if (loading && !refreshing && pokemonList.length === 0) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#FF6B6B" />
        <Text style={styles.loadingText}>Cargando Pokémon...</Text>
      </View>
    );
  }

  if (error && pokemonList.length === 0) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>Error: {error}</Text>
        <Text style={styles.retryText}>Por favor intenta más tarde</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <SearchAndFilters
        onSearch={handleSearch}
        onFilterByType={handleFilterByType}
        selectedType={selectedType}
      />
      
      {searchLoading ? (
        <View style={styles.searchLoadingContainer}>
          <ActivityIndicator size="small" color="#FF6B6B" />
          <Text style={styles.searchLoadingText}>Buscando...</Text>
        </View>
      ) : (
        <FlatList
          data={filteredPokemon}
          renderItem={({ item }) => (
            <PokemonCard
              pokemon={item}
              isFavorite={isFavorite(item.id)}
              onToggleFavorite={toggleFavorite}
            />
          )}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          columnWrapperStyle={styles.columnWrapper}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleRefresh}
              tintColor="#FF6B6B"
            />
          }
          contentContainerStyle={[
            styles.flatListContent,
            filteredPokemon.length === 0 && styles.emptyListContent
          ]}
          ListEmptyComponent={renderEmptyState}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  flatListContent: {
    paddingVertical: 8,
  },
  emptyListContent: {
    flexGrow: 1,
  },
  columnWrapper: {
    justifyContent: 'space-between',
    paddingHorizontal: 8,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#666',
  },
  errorText: {
    fontSize: 16,
    color: '#d32f2f',
    textAlign: 'center',
  },
  retryText: {
    fontSize: 14,
    color: '#999',
    marginTop: 8,
    textAlign: 'center',
  },
  searchLoadingContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  searchLoadingText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#666',
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#666',
    textAlign: 'center',
  },
  emptySubtext: {
    fontSize: 14,
    color: '#999',
    marginTop: 8,
    textAlign: 'center',
  },
});

export default PokemonListScreen;
