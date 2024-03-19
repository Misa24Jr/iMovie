import React from "react";
import { View, StyleSheet, TextInput, Text} from "react-native";

const Input = ({name, placeholder, max}) => {
    return(

        <View style={style.containerInput}>

            <Text style={style.name}>{name}</Text>

            <TextInput
                style={style.input}
                placeholder={placeholder}
                maxLength={max}
                placeholderTextColor={'#444747'}
            />

        </View>
    )
}

const style = StyleSheet.create({
    name:{
        fontSize: 16,
        color: 'white',
        marginLeft: 15,
        fontFamily: 'Jura_400Regular'
    },
    input:{
        width: 325,
        height: 50,
        borderRadius: 25,
        borderColor: '#3C5252',
        borderWidth: 2,
        paddingLeft: 30,
        fontSize: 16,
        color: '#fff',
        fontFamily: 'Jura_400Regular',
        backgroundColor: '#8A909033',
      },
    containerInput:{
        display: 'flex',
        gap: 15,
    }
})

export default Input;