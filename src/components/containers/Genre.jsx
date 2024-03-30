import React from "react";
import { StyleSheet, View, Text } from "react-native";

const Genre = ({name}) => {
    return(
        <View style={style.GenreContent}>
            <Text style={style.genre}>{name}</Text>
        </View>

    )
};

const style = StyleSheet.create({
    genre:{
        color: 'white',
        fontSize: 13,
        fontFamily: 'Jura_400Regular', 
    },
    GenreContent:{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: 76,
        backgroundColor: 'rgba(78, 95, 94, 0.7)',
        padding: 5,
        borderRadius: 10,
        borderColor: '#8CCECC',
        borderWidth: 1,
    },
})
export default Genre;