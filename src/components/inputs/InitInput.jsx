import React, { useState } from "react";
import { View, StyleSheet, TextInput, Text, TouchableOpacity } from "react-native";

const InitInput = ({ name, placeholder, max, changeTextHandler, secureEntry, parentSetterFunction }) => {
    const [inputValue, setInputValue] = useState('');

    const resetState = () => {
        setInputValue('');
        parentSetterFunction('');
    };

    return (
        <View style={style.containerInput}>
            <Text style={style.name}>{name}</Text>
            <TextInput
                style={style.input}
                placeholder={placeholder}
                onChangeText={(input) => {
                    setInputValue(input);
                    changeTextHandler(input);
                }}
                maxLength={max}
                placeholderTextColor={'#444747'}
                secureTextEntry={secureEntry}
                value={inputValue}
            />

            {inputValue !== '' && (
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