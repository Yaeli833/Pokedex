import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navegacion/AppNavigator';
import { usePokemonDetail } from '../hooks/usePokemon';

type PokemonDetailScreenRouteProp = RouteProp<RootStackParamList, 'PokemonDetail'>;

interface PokemonDetailScreenProps {
  route: PokemonDetailScreenRouteProp;
}

const PokemonDetailScreen: React.FC<PokemonDetailScreenProps> = ({ route }) => {
  const { id } = route.params;
  const { pokemonDetail, loading, error } = usePokemonDetail(id);

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#FF6B6B" />
        <Text style={styles.loadingText}>Cargando detalle...</Text>
      </View>
    );
  }

  if (error || !pokemonDetail) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={{ uri: pokemonDetail.sprites.other['official-artwork'].front_default }}
          style={styles.image}
        />
        <Text style={styles.name}>
          {pokemonDetail.name.charAt(0).toUpperCase() + pokemonDetail.name.slice(1)}
        </Text>
        <Text style={styles.id}>#{pokemonDetail.id}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Tipos</Text>
        <View style={styles.typesContainer}>
          {pokemonDetail.types.map((typeInfo, index) => (
            <Text key={index} style={styles.type}>
              {typeInfo.type.name.charAt(0).toUpperCase() + typeInfo.type.name.slice(1)}
            </Text>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Características</Text>
        <View style={styles.statsContainer}>
          <Text style={styles.stat}>Peso: {pokemonDetail.weight / 10} kg</Text>
          <Text style={styles.stat}>Altura: {pokemonDetail.height / 10} m</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Habilidades</Text>
        <View style={styles.abilitiesContainer}>
          {pokemonDetail.abilities.map((abilityInfo, index) => (
            <Text key={index} style={styles.ability}>
              {abilityInfo.ability.name.charAt(0).toUpperCase() + abilityInfo.ability.name.slice(1)}
            </Text>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Estadísticas Base</Text>
        {pokemonDetail.stats.map((statInfo, index) => (
          <View key={index} style={styles.statRow}>
            <Text style={styles.statName}>
              {statInfo.stat.name.charAt(0).toUpperCase() + statInfo.stat.name.slice(1)}
            </Text>
            <Text style={styles.statValue}>{statInfo.base_stat}</Text>
          </View>
        ))}
      </View>
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
  errorText: {
    fontSize: 16,
    color: '#ff0000',
  },
  header: {
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
    marginBottom: 10,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 10,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  id: {
    fontSize: 18,
    color: '#666',
  },
  section: {
    backgroundColor: '#fff',
    margin: 10,
    padding: 15,
    borderRadius: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  typesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  type: {
    backgroundColor: '#FF6B6B',
    color: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
    marginRight: 5,
    marginBottom: 5,
    fontSize: 14,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  stat: {
    fontSize: 16,
    color: '#666',
  },
  abilitiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  ability: {
    backgroundColor: '#4CAF50',
    color: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
    marginRight: 5,
    marginBottom: 5,
    fontSize: 14,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
  },
  statName: {
    fontSize: 16,
    color: '#333',
  },
  statValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF6B6B',
  },
});

export default PokemonDetailScreen;