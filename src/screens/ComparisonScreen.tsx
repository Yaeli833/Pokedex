import React from 'react';
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useComparisonContext } from '../context/ComparisonContext';
import { PokemonDetail } from '../types/pokemon';

const ComparisonScreen: React.FC = () => {

  const { pokemon1, pokemon2, loading, clearComparison, removePokemon } = useComparisonContext();



  const renderPokemonSlot = (pokemon: PokemonDetail | null, slot: 1 | 2) => {
    if (!pokemon) {
      return (
        <View style={styles.emptySlot}>
          <Text style={styles.emptyText}>Selecciona un Pokemon</Text>
          <Text style={styles.emptySubtext}>Slot {slot}</Text>
        </View>
      );
    }

    return (
      <View style={styles.pokemonSlot}>
        <TouchableOpacity 
          style={styles.removeButton}
          onPress={() => removePokemon(slot)}
        >
          <Text style={styles.removeText}>X</Text>
        </TouchableOpacity>
        
        <Image
          source={{ uri: pokemon.sprites.other['official-artwork'].front_default }}
          style={styles.pokemonImage}
        />
        <Text style={styles.pokemonName}>
          {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
        </Text>
        <Text style={styles.pokemonId}>#{pokemon.id}</Text>
        
        <View style={styles.typesContainer}>
          {pokemon.types.map((typeInfo, index) => (
            <Text key={index} style={styles.type}>
              {typeInfo.type.name}
            </Text>
          ))}
        </View>
      </View>
    );
  };

  const renderStatComparison = () => {
    if (!pokemon1 || !pokemon2) return null;

    return (
      <View style={styles.statsComparison}>
        <Text style={styles.sectionTitle}>Comparacion de Estadisticas</Text>
        
        {pokemon1.stats.map((stat1, index) => {
          const stat2 = pokemon2.stats[index];
          const statName = stat1.stat.name.charAt(0).toUpperCase() + stat1.stat.name.slice(1);
          
          return (
            <View key={index} style={styles.statRow}>
              <Text style={styles.statName}>{statName}</Text>
              
              <View style={styles.statComparison}>
                <View style={styles.statValue}>
                  <Text style={[
                    styles.statNumber,
                    stat1.base_stat > stat2.base_stat && styles.winnerStat
                  ]}>
                    {stat1.base_stat}
                  </Text>
                </View>
                
                <Text style={styles.vsText}>VS</Text>
                
                <View style={styles.statValue}>
                  <Text style={[
                    styles.statNumber,
                    stat2.base_stat > stat1.base_stat && styles.winnerStat
                  ]}>
                    {stat2.base_stat}
                  </Text>
                </View>
              </View>
            </View>
          );
        })}
        
        <View style={styles.totalStats}>
          <Text style={styles.totalTitle}>Total de Estadisticas</Text>
          <View style={styles.statComparison}>
            <Text style={[
              styles.totalNumber,
              pokemon1.stats.reduce((sum, stat) => sum + stat.base_stat, 0) > 
              pokemon2.stats.reduce((sum, stat) => sum + stat.base_stat, 0) && styles.winnerStat
            ]}>
              {pokemon1.stats.reduce((sum, stat) => sum + stat.base_stat, 0)}
            </Text>
            
            <Text style={styles.vsText}>VS</Text>
            
            <Text style={[
              styles.totalNumber,
              pokemon2.stats.reduce((sum, stat) => sum + stat.base_stat, 0) > 
              pokemon1.stats.reduce((sum, stat) => sum + stat.base_stat, 0) && styles.winnerStat
            ]}>
              {pokemon2.stats.reduce((sum, stat) => sum + stat.base_stat, 0)}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#FF6B6B" />
        <Text style={styles.loadingText}>Cargando Pokemon...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Comparador de Pokemon</Text>



        {(pokemon1 || pokemon2) && (
          <TouchableOpacity style={styles.clearButton} onPress={clearComparison}>
            <Text style={styles.clearButtonText}>Limpiar Todo</Text>
          </TouchableOpacity>
        )}
      </View>


      <View style={styles.pokemonContainer}>
        {renderPokemonSlot(pokemon1, 1)}
        
        <View style={styles.vsContainer}>
          <Text style={styles.vsMainText}>VS</Text>
        </View>
        
        {renderPokemonSlot(pokemon2, 2)}
      </View>

      {renderStatComparison()}
    </ScrollView>
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
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  clearButton: {
    backgroundColor: '#FF6B6B',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },
  clearButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  pokemonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  pokemonSlot: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 15,
    alignItems: 'center',
    marginHorizontal: 5,
    position: 'relative',
  },
  emptySlot: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    borderRadius: 15,
    padding: 40,
    alignItems: 'center',
    marginHorizontal: 5,
    borderWidth: 2,
    borderColor: '#ddd',
    borderStyle: 'dashed',
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  emptySubtext: {
    fontSize: 14,
    color: '#999',
    marginTop: 5,
  },
  removeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#ff4444',
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  removeText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  pokemonImage: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  pokemonName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  pokemonId: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  typesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  type: {
    backgroundColor: '#FF6B6B',
    color: '#fff',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    fontSize: 12,
    marginHorizontal: 2,
    marginVertical: 2,
  },
  vsContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  vsMainText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF6B6B',
  },
  statsComparison: {
    backgroundColor: '#fff',
    margin: 10,
    padding: 20,
    borderRadius: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  statRow: {
    marginBottom: 15,
  },
  statName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
    marginBottom: 8,
  },
  statComparison: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statValue: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#666',
  },
  winnerStat: {
    color: '#4CAF50',
  },
  vsText: {
    fontSize: 14,
    color: '#999',
    marginHorizontal: 20,
  },
  totalStats: {
    marginTop: 20,
    paddingTop: 20,
    borderTopWidth: 2,
    borderTopColor: '#eee',
  },
  totalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 10,
  },
  totalNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#666',
  },
});

export default ComparisonScreen;