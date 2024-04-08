import React from "react";
import { StyleSheet, View, Text } from "react-native";

const TitleChat = () => {
    return(
        <>
            <View style={style.containerTitle}>
                <Text style={style.title}>General Chat</Text>
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
        display: 'flex',
        flexDirection: 'row',
        gap: 10,
    },
    containerLine:{
        flexDirection: 'column',
        justifyContent: 'center',
    },
    title: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
        fontFamily: 'Jura_400Regular'
    },
    line: {
        width: 180,
        height: 2,
        backgroundColor: 'gray',
        marginTop: 5,
    },
});

export default TitleChat;