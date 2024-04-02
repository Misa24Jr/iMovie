import React from "react";
import { StyleSheet, View, TextInput, Text } from "react-native";

const UserInput = ({placeholder, name, value, secureTextEntry, editable = true}) => {
    return(
        <View style={style.containerInput}>

            <Text style={style.name}>{name}</Text>
            <TextInput
                style={style.input}
                placeholder={placeholder}
                placeholderTextColor={'#ffffff'}
                value={value}
                secureTextEntry={secureTextEntry}
                editable={editable} // Add this line to disable the text input
            />
        </View>
    )
};

const style = StyleSheet.create({
    containerInput:{
        width: '100%',
        gap: 20,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    input:{
        width: 200,
        height: 40,
        borderRadius: 10,
        backgroundColor: '#1c1c1c',
        color: '#ffffff',
        padding: 10,
    },
    name:{
        color: '#8CCECC',
        fontSize: 12,
        fontFamily: 'Jura_400Regular',
        fontWeight: 'bold',
    }
});

export default UserInput;