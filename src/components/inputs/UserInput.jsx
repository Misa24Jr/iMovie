import React from "react";
import { StyleSheet, View, TextInput, Text } from "react-native";

const UserInput = ({ placeholder, name, value, secureTextEntry, editable = true }) => {
    return (
        <View style={styles.containerInput}>
            <Text style={styles.name}>{name}</Text>
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
    );
};

const styles = StyleSheet.create({
    containerInput: {
        width: '100%',
        gap: 20,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
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
        fontSize: 12,
        fontFamily: 'Jura_400Regular',
        fontWeight: 'bold',
    }
});

export default UserInput;
