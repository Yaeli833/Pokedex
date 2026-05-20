import React, { useState, useEffect } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Text,
} from 'react-native';
import { pokemonApi } from '../services/pokemonApi';

interface SearchAndFiltersProps {
  onSearch: (query: string) => void;
  onFilterByType: (type: string | null) => void;
  selectedType: string | null;
}

const SearchAndFilters: React.FC<SearchAndFiltersProps> = ({
  onSearch,
  onFilterByType,
  selectedType,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [types, setTypes] = useState<string[]>([]);

  useEffect(() => {
    const loadTypes = async () => {
      const pokemonTypes = await pokemonApi.getPokemonTypes();
      setTypes(pokemonTypes.slice(0, 10)); // Limitar a 10 tipos principales
    };
    loadTypes();
  }, []);

  const handleSearch = (text: string) => {
    setSearchQuery(text);
    onSearch(text);
  };

  const handleTypeFilter = (type: string) => {
    const newType = selectedType === type ? null : type;
    onFilterByType(newType);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Buscar Pokémon por nombre..."
        value={searchQuery}
        onChangeText={handleSearch}
        autoCapitalize="none"
      />
      
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filtersContainer}>
        <TouchableOpacity
          style={[styles.filterButton, !selectedType && styles.filterButtonActive]}
          onPress={() => onFilterByType(null)}
        >
          <Text style={[styles.filterText, !selectedType && styles.filterTextActive]}>
            Todos
          </Text>
        </TouchableOpacity>
        {types.map((type) => (
          <TouchableOpacity
            key={type}
            style={[styles.filterButton, selectedType === type && styles.filterButtonActive]}
            onPress={() => handleTypeFilter(type)}
          >
            <Text style={[styles.filterText, selectedType === type && styles.filterTextActive]}>
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  searchInput: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    marginBottom: 12,
  },
  filtersContainer: {
    flexDirection: 'row',
  },
  filterButton: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
  },
  filterButtonActive: {
    backgroundColor: '#FF6B6B',
  },
  filterText: {
    fontSize: 14,
    color: '#666',
  },
  filterTextActive: {
    color: '#fff',
    fontWeight: '600',
  },
});

export default SearchAndFilters;