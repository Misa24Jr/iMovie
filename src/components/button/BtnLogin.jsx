import React, {useEffect} from "react";
import { Text, TouchableOpacity, StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as Font from 'expo-font';


const BtnLogin = ({text, }) =>{
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
        <View>
            <TouchableOpacity
                onPress={() => navigarion.navigate('LoginView')}
                style={style.container}

            >
                <Text style={style.text}>{text}</Text>
            </TouchableOpacity>
        </View>
    )
}

const style = StyleSheet.create({
    container:{
        width: 325,
        height: 50,
        backgroundColor: '#8CCECC',
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
        fontWeight: 'bold',
    }
})
export default BtnLogin;