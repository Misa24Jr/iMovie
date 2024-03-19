import React from 'react';
import Navigation from './src/router/Navigation';
import { useFonts, Jura_400Regular, Jura_Bold700 } from 'expo-font';

export default function App() {
  const [dataLoaded] = useFonts({
    'Jura_400Regular': require('./assets/fonts/Jura-Regular.ttf'),
    'Jura_Bold700': require('./assets/fonts/Jura-Bold.ttf'),
  });

  if (!dataLoaded) {
    return null; // Otra opción sería mostrar un indicador de carga aquí
  }

  return <Navigation />;
}
