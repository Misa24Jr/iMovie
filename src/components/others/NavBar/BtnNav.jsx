import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";

const BtnNav = ({ text, clickHandler}) =>{
    return(
        <TouchableOpacity
            onPress={clickHandler}
            style={style.btn}
            >
            <Text style={style.text}>{text}</Text>
        </TouchableOpacity>
    )
}

const style = StyleSheet.create({
    text:{
        color: 'black',
        textAlign: 'center',
        fontSize: 20,
        fontFamily: 'Jura_400Regular'
    },
    btn:{
        ouline: 0,
        border: 0,
        width: 50,
        height: 50,
        borderRadius: "50%",
        backgroundColor: 'white',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        transition: "all ease-in-out 0.3s",
        cursor: 'pointer',
    }
})
export default BtnNav;