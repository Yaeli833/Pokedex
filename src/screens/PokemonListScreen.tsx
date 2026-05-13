import React, { useEffect, useState } from 'react';
import {
  View,
  FlatList,
  ActivityIndicator,
  Text,
  StyleSheet,
  RefreshControl,
} from 'react-native';
import { usePokemonList } from '../hooks/usePokemon';
import PokemonCard from '../components/PokemonCard';

const PokemonListScreen: React.FC = () => {
  const { pokemonList, loading, error, fetchPokemonList } = usePokemonList();
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchPokemonList(20);
  }, []);

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchPokemonList(20);
    setRefreshing(false);
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
      <FlatList
        data={pokemonList}
        renderItem={({ item }) => <PokemonCard pokemon={item} />}
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
        contentContainerStyle={styles.flatListContent}
      />
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
});

export default PokemonListScreen;
