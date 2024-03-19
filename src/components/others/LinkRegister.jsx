import React, {useEffect} from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from '@react-navigation/native';
import * as Font from 'expo-font'; 

const Link = ({text}) =>{
    const navigation = useNavigation();

    const loadFonts = async () => {
        await Font.loadAsync({
          'Jura': require('../../../assets/fonts/Jura.ttf')
        })
      }
    
      useEffect(() => {
        loadFonts();
      }, []);

    return(
        <TouchableOpacity
            onPress={()=> navigation.navigate('LoginView')}
        >
            <Text style={style.text}>{text}</Text>
        </TouchableOpacity>
    )
}

const style = StyleSheet.create({
    text:{
        color: '#fff',
        textAlign: 'center',
        fontSize: 20,
        fontFamily: 'Jura',
    }
})

export default Link;