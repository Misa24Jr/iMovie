import React from "react";
import { StyleSheet, View, Text, Image } from "react-native";

const SearchView = () => {
    return(
        <>
            <View style={style.container}>
                <Text style={style.text}>Search View</Text>
            </View>
        </>
    )
}; 

const style = StyleSheet.create({
    container: {
        padding: 10,
        borderRadius: 10,
    },
    text: {
        color: 'white',
        fontSize: 16,
        fontFamily: 'Jura_400Regular',
    },
});

export default SearchView;