import React, {useEffect} from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as Font from 'expo-font';

const BtnRegister = ({text}) =>{
    const navigarion = useNavigation();

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
            onPress={() => navigarion.navigate('RegisterView')}
            style={style.container}

        >
            <Text style={style.text}>{text}</Text>
        </TouchableOpacity>
    )
}

const style = StyleSheet.create({
    container:{
        width: 325,
        height: 50,
        backgroundColor: '#3C5252',
        borderRadius: 25,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text:{
        color: '#fff',
        textAlign: 'center',
        fontSize: 20,
        fontFamily: 'Jura',
    }
})
export default BtnRegister;