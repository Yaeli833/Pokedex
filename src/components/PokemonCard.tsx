import React from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
} from 'react-native';
import { PokemonListItem } from '../types/pokemon';

interface PokemonCardProps {
  pokemon: PokemonListItem;
}

const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon }) => {
  return (
    <View style={styles.card}>
      <Image source={{ uri: pokemon.image }} style={styles.image} />
      <Text style={styles.name} numberOfLines={1}>
        {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
      </Text>
      <Text style={styles.id}>#{pokemon.id}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: 8,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    width: 80,
    height: 80,
    marginBottom: 8,
  },
  name: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
    color: '#333',
  },
  id: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
  },
});

export default PokemonCard;
