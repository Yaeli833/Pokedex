import React from 'react';
import {
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navegacion/AppNavigator';
import { PokemonListItem } from '../types/pokemon';

interface PokemonCardProps {
  pokemon: PokemonListItem;
}

type PokemonCardNavigationProp = NativeStackNavigationProp<RootStackParamList, 'PokemonList'>;

const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon }) => {
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
