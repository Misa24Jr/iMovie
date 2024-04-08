import React from "react";
import { StyleSheet, View, TextInput, Text } from "react-native";

const UserInput = ({ placeholder, name, value, secureTextEntry, editable = true }) => {
    return (
        <View style={styles.containerInput}>
            <View style={styles.containerNickname}>
                <Text style={styles.name}>{name}</Text>
            </View>
            
            <View style={styles.containerInputText}>
                <TextInput
                    style={styles.input}
                    placeholder={placeholder}
                    placeholderTextColor={'#ffffff'}
                    value={value}
                    secureTextEntry={secureTextEntry}
                    editable={editable} // Aquí se configura la propiedad editable del TextInput
                    onChangeText={(text) => console.log(text)} // Puedes agregar tu lógica de manejo de cambios aquí
                />
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    containerInput: {
        width: 280,
        gap: 25,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    input: {
        width: 200,
        height: 40,
        borderRadius: 10,
        backgroundColor: '#1c1c1c',
        color: '#ffffff',
        padding: 10,
    },
    name: {
        color: '#8CCECC',
        fontSize: 15,
        fontFamily: 'Jura_400Regular',
        fontWeight: 'bold',
    },
    containerNickname:{
        width: "25%",
    },
    containerInputText:{
        width: "70%",
    }
});

export default UserInput;
