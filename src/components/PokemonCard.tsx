import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { useComparisonContext } from '../context/ComparisonContext';
import { RootStackParamList } from '../navegacion/AppNavigator';
import { PokemonListItem } from '../types/pokemon';


interface PokemonCardProps {
  pokemon: PokemonListItem;
  isFavorite?: boolean;
  onToggleFavorite?: (id: number) => void;
  showCompareButton?: boolean;
}

type PokemonCardNavigationProp = NativeStackNavigationProp<RootStackParamList, 'PokemonList'>;

const PokemonCard: React.FC<PokemonCardProps> = ({ 
  pokemon, 
  isFavorite, 
  onToggleFavorite, 
  showCompareButton = false 
}) => {
  const navigation = useNavigation<PokemonCardNavigationProp>();
  const { addPokemonToComparison } = useComparisonContext();


  const handlePress = () => {
    navigation.navigate('PokemonDetail', { id: pokemon.id });
  };

  const handleCompareSlot1 = () => {
    addPokemonToComparison(pokemon.id, 1);
    navigation.navigate('Comparison');
  };

  const handleCompareSlot2 = () => {
    addPokemonToComparison(pokemon.id, 2);
    navigation.navigate('Comparison');
  };



  return (
    <TouchableOpacity style={styles.card} onPress={handlePress}>
      <Image source={{ uri: pokemon.image }} style={styles.image} />
      <Text style={styles.name} numberOfLines={1}>
        {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
      </Text>
      <Text style={styles.id}>#{pokemon.id}</Text>
      
      <View style={styles.buttonsContainer}>
        {onToggleFavorite && (
          <TouchableOpacity 
            style={styles.favoriteButton} 
            onPress={() => onToggleFavorite(pokemon.id)}
          >
            <Text style={styles.favoriteIcon}>{isFavorite ? '♥' : '♡'}</Text>
          </TouchableOpacity>
        )}
        
        {showCompareButton && (
          <View style={styles.compareButtonsContainer}>
            <TouchableOpacity
              style={styles.compareButton}
              onPress={handleCompareSlot1}
            >
              <Text style={styles.compareIcon}>VS 1</Text>

            </TouchableOpacity>

            <TouchableOpacity
              style={styles.compareButton}
              onPress={handleCompareSlot2}
            >
              <Text style={styles.compareIcon}>VS 2</Text>

            </TouchableOpacity>
          </View>
        )}

      </View>
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
  buttonsContainer: {
    position: 'absolute',
    top: 8,
    right: 8,
    flexDirection: 'row',
  },
  favoriteButton: {
    marginRight: 5,
  },
  favoriteIcon: {
    fontSize: 20,
  },
  compareButtonsContainer: {
    flexDirection: 'row',
    gap: 6,
  },
  compareButton: {
    marginLeft: 0,
  },

  compareIcon: {
    fontSize: 16,
  },
});

export default PokemonCard;
