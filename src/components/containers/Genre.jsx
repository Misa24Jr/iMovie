import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

const Genre = ({ id, name, onPress }) => {
    const [selected, setSelected] = useState(false);

    const toggleSelected = () => {
        setSelected(!selected);
        onPress(id)
    };

    return (
        <TouchableOpacity onPress={toggleSelected}>
            <View style={[styles.genreContent, selected && styles.selectedGenreContent]}>
                <Text style={[styles.genre, selected && styles.selectedGenre]}>{name}</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    genre: {
        color: 'white',
        fontSize: 13,
        fontFamily: 'Jura_400Regular', 
        textAlign: 'center',
    },
    genreContent: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 76,
        padding: 5,
        borderRadius: 10,
        borderColor: '#8CCECC',
        borderWidth: 1,
    },
    selectedGenre: {
        color: 'black',
    },
    selectedGenreContent: {
        backgroundColor: '#8CCECC',
    },
});

export default Genre;
