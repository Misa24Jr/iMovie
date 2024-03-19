import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";

const Link = ({text}) =>{
    return(
        <TouchableOpacity>
            <Text style={style.text}>{text}</Text>
        </TouchableOpacity>
    )
}

const style = StyleSheet.create({
    text:{
        color: '#fff',
        textAlign: 'center',
        fontSize: 20,
    }
})

export default Link;