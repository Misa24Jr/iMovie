import React, { useState } from "react";
import { View, StyleSheet, TextInput, Text, TouchableOpacity } from "react-native";

const InitInput = ({ name, placeholder, max, changeTextHandler, secureEntry }) => {
    const [text, setText] = useState('');

    const resetState = () => {
        setText('');
    };

    return (
        <View style={style.containerInput}>
            <Text style={style.name}>{name}</Text>
            <TextInput
                style={style.input}
                placeholder={placeholder}
                onChangeText={(input) => {
                    setText(input);
                    changeTextHandler(input); // Call the changeTextHandler to update the state
                }}
                maxLength={max}
                placeholderTextColor={'#444747'}
                secureTextEntry={secureEntry}
                value={text}
            />

            {text !== '' && (  // Only show the clear button when there is text in the input
                <TouchableOpacity style={style.clear} onPress={resetState}>
                    <Text style={style.textClear}>X</Text>
                </TouchableOpacity>
            )}
        </View>
    );
};

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
    },
    clear:{
        position: 'absolute',
        right: 25,
        top: 48,
    },
    textClear:{
        fontSize: 18,
        color: 'white',
        fontFamily: 'Jura_400Regular'
    }
})

export default InitInput;