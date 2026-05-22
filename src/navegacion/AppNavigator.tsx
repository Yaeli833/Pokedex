import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import PokemonDetailScreen from '../screens/PokemonDetailScreen';
import PokemonListScreen from '../screens/PokemonListScreen';
import ComparisonScreen from '../screens/ComparisonScreen';

export type RootStackParamList = {
  PokemonList: undefined;
  PokemonDetail: { id: number };
  Comparison: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: '#FF6B6B' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold', fontSize: 18 },
        }}
      >
        <Stack.Screen
          name="PokemonList"
          component={PokemonListScreen}
          options={{ title: 'Pokedex' }}
        />
        <Stack.Screen
          name="PokemonDetail"
          component={PokemonDetailScreen}
          options={{ title: 'Detalle Pokemon' }}
        />
        <Stack.Screen
          name="Comparison"
          component={ComparisonScreen}
          options={{ title: 'Comparar Pokemon' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

