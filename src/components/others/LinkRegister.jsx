import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from '@react-navigation/native';

const Link = ({text}) =>{
    const navigation = useNavigation();

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
    }
})

export default Link;