import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const Navbar = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { selectedButton: initialSelectedButton } = route.params || {};
  const [selectedButton, setSelectedButton] = useState(initialSelectedButton);

  useEffect(() => {
    if (initialSelectedButton) {
      setSelectedButton(initialSelectedButton);
    }
  }, [initialSelectedButton]);

  const handleButtonPress = (buttonName, ruta) => {
    setSelectedButton(buttonName);
    navigation.navigate(ruta, { selectedButton: buttonName });
  };

  return (
    <View style={styles.navbar}>
      <TouchableOpacity
        style={[styles.button, selectedButton === 'button1' && styles.selectedButton]}
        onPress={() => handleButtonPress('button1', 'NewsView')}
      >
            <Image
                source={require('../../../../assets/flash.png')}
                style={{ width: 30, height: 30 }}
            />
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, selectedButton === 'button2' && styles.selectedButton]}
        onPress={() => handleButtonPress('button2', 'SearchView')}
      >
            <Image
                source={require('../../../../assets/search.png')}
                style={{ width: 30, height: 30 }}
            />
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, selectedButton === 'button3' && styles.selectedButton]}
        onPress={() => handleButtonPress('button3', 'MyReviewView')}
      >
            <Image
                source={require('../../../../assets/review.png')}
                style={{ width: 30, height: 30 }}
            />
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, selectedButton === 'button4' && styles.selectedButton]}
        onPress={() => handleButtonPress('button4', 'GeneralChat')}
      >
            <Image
                source={require('../../../../assets/chat.png')}
                style={{ width: 30, height: 30 }}
            />
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, selectedButton === 'button5' && styles.selectedButton]}
        onPress={() => handleButtonPress('button5', 'UserSettings')}
      >
            <Image
                source={require('../../../../assets/user.png')}
                style={{ width: 30, height: 30 }}
            />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    gap: 10,
  },
  button: {
    padding: 10,
  },
  selectedButton: {
    borderBottomWidth: 5,
    borderBottomColor: '#8CCECC',
  },
});

export default Navbar;
