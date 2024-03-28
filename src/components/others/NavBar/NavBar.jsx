import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Navbar = () => {
  const navigation = useNavigation();
  const [selectedButton, setSelectedButton] = useState(null);

  const handleButtonPress = (buttonName, ruta) => {
    setSelectedButton(buttonName);
    navigation.navigate(ruta);
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
        onPress={() => handleButtonPress('button2')}
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
        onPress={() => handleButtonPress('button4')}
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
