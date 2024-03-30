import React from "react";
import { StyleSheet, View, Text } from "react-native";

const MyReviewTitle = () => {
    return(
        <>
            <View style={style.containerTitle}>
                <Text style={style.title}>My Reviews</Text>
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
        display: 'flex',
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

export default MyReviewTitle;