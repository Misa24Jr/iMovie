import React from "react";
import { StyleSheet, View, Text } from "react-native";

const CriticTitle = () => {
    return(
        <>
            <View style={style.containerTitle}>
                <Text style={style.title}>Critic Reviews</Text>
                <View style={style.containerLine}>
                    <View style={style.line}></View>
                </View>
            </View>
        </>
    )
};

const style = StyleSheet.create({
    containerTitle: {
        marginTop: 20,
        marginBottom: 20,
        marginLeft: 20,
        flexDirection: 'row',
        gap: 10,
    },
    containerLine:{
        justifyContent: 'center',
    },
    title: {
        color: '#3C5252',
        fontSize: 15,
        fontWeight: 'bold',
        fontFamily: 'Jura_400Regular'
    },
    line: {
        width: 225,
        height: 2,
        backgroundColor: '#3C5252',
        marginTop: 5,
    },
});

export default CriticTitle;