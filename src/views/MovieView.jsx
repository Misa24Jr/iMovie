import React from "react";
import { StyleSheet, View, Text } from "react-native";

const MovieView = () =>{
    return(
        <View style={style.container}>
            <View style={style.text}>
                <Text>Movie View</Text>
            </View>
        </View>
    )
};

const style = StyleSheet.create({
    container: {
        backgroundColor: '#151515',
        height: '100%',
    },
    text:{
        top: 40,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        fontSize: 20
    }
});
export default MovieView;