// FontLoader.js
import { useEffect } from 'react';
import * as Font from 'expo-font';

const loadFonts = async () => {
  await Font.loadAsync({
    'Jura': require('../../assets/fonts/Jura.ttf'),
  });
};

const useLoadFonts = () => {
  useEffect(() => {
    loadFonts();
  }, []);
};

export default useLoadFonts;

