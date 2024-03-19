import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";

const InitLink = ({text}, {handleCLick}) =>{

    return(
        <TouchableOpacity
            onPress={handleCLick}
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
        fontFamily: 'Jura_400Regular'
    }
})

export default InitLink;