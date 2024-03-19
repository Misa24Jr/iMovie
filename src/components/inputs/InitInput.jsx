import React from "react";
import { View, StyleSheet, TextInput, Text, TouchableOpacity} from "react-native";
import { useState, useEffect } from "react";
import * as Font from 'expo-font'; 

const InitInput = ({name, placeholder, max}) => {

    const [text, setText] = useState('');
    const [isClear, setIsClear] = useState(true);

    const loadFonts = async () => {
        await Font.loadAsync({
          'Jura': require('../../../assets/fonts/Jura.ttf')
        })
      }
    
      useEffect(() => {
        loadFonts();
      }, []);

    return(

        <View style={style.containerInput}>

            <Text style={style.name}>{name}</Text>

            <TextInput
                value={text}
                onChangeText={newText => {
                    setText(newText);
                    setIsClear(newText === '');
                }}


                style={style.input}
                placeholder={placeholder}
                maxLength={max}
                placeholderTextColor={'#444747'}
            />

            {!isClear && (
                <TouchableOpacity style={style.clear}
                    onPress={()=> setText('')}
                        >
                    <Text style={style.textClear}>X</Text>
                </TouchableOpacity>
            )}


        </View>
    )
}

const style = StyleSheet.create({
    name:{
        fontSize: 16,
        color: 'white',
        marginLeft: 15,
        fontFamily: 'Jura',
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
        backgroundColor: '#8A909033',
        fontFamily: 'Jura',
      },
    containerInput:{
        display: 'flex',
        gap: 15,
    },
    clear:{
        position: 'absolute',
        right: 25,
        top: 50,
    },
    textClear:{
        fontSize: 15,
        color: 'white',
    }
})

export default InitInput;