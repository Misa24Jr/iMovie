import React from "react";
import { Text, TouchableOpacity, StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

const BtnLogin = ({text}) =>{
    const navigarion = useNavigation();
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
    }
})
export default BtnLogin;