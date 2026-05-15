import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PokemonListScreen from '../screens/PokemonListScreen';
import PokemonDetailScreen from '../screens/PokemonDetailScreen';

export type RootStackParamList = {
  PokemonList: undefined;
  PokemonDetail: { id: number };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: '#FF6B6B',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 18,
          },
        }}
      >
        <Stack.Screen
          name="PokemonList"
          component={PokemonListScreen}
          options={{
            title: 'Pokédex',
            headerShown: true,
          }}
        />
        <Stack.Screen
          name="PokemonDetail"
          component={PokemonDetailScreen}
          options={{
            title: 'Detalle Pokémon',
            headerShown: true,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

