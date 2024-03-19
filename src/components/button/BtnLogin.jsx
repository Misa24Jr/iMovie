import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";

const BtnLogin = ({ text, clickHandler }) =>{
    return(
        <TouchableOpacity
            onPress={clickHandler}
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
        fontFamily: 'Jura_400Regular'
    }
})
export default BtnLogin;