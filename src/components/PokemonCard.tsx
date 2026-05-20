import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import { RootStackParamList } from '../navegacion/AppNavigator';
import { PokemonListItem } from '../types/pokemon';

interface PokemonCardProps {
  pokemon: PokemonListItem;
  isFavorite?: boolean;
  onToggleFavorite?: (id: number) => void;
}

type PokemonCardNavigationProp = NativeStackNavigationProp<RootStackParamList, 'PokemonList'>;

const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon, isFavorite, onToggleFavorite }) => {
  const navigation = useNavigation<PokemonCardNavigationProp>();

  const handlePress = () => {
    navigation.navigate('PokemonDetail', { id: pokemon.id });
  };

  return (
    <TouchableOpacity style={styles.card} onPress={handlePress}>
      <Image source={{ uri: pokemon.image }} style={styles.image} />
      <Text style={styles.name} numberOfLines={1}>
        {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
      </Text>
      <Text style={styles.id}>#{pokemon.id}</Text>
      {onToggleFavorite && (
        <TouchableOpacity 
          style={styles.favoriteButton} 
          onPress={() => onToggleFavorite(pokemon.id)}
        >
          <Text style={styles.favoriteIcon}>{isFavorite ? '♥' : '♡'}</Text>
        </TouchableOpacity>
      )}
    </TouchableOpacity>
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
    position: 'relative',
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
  favoriteButton: {
    position: 'absolute',
    top: 8,
    right: 8,
  },
  favoriteIcon: {
    fontSize: 20,
  },
});

export default PokemonCard;
