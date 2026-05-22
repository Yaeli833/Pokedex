import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ComparisonProvider } from './src/context/ComparisonContext';
import AppNavigator from './src/navegacion/AppNavigator';

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ComparisonProvider>
        <AppNavigator />
      </ComparisonProvider>
    </GestureHandlerRootView>
  );
}

