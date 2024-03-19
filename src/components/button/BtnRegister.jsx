import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";

const BtnRegister = ( {text, clickHandler, color }) =>{
    return(
        <TouchableOpacity
            onPress={clickHandler}
            style={{
                ...style.container,
                backgroundColor: color
            }}
        >
            <Text style={style.text}>{text}</Text>
        </TouchableOpacity>
    )
}

const style = StyleSheet.create({
    container:{
        width: 325,
        height: 50,
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
export default BtnRegister;