import React from "react";
import { View, Text, StyleSheet } from "react-native";

// Components
import TitleChat from "../others/TitleChat";

const ChatTemplaneComponent = () => {
    return(
        <>
            <View style={style.containerTitle}>
                <TitleChat />
            </View>
        </>
    );
};

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#151515',
    },
    containerTitle: {
        position: 'absolute',
        top: 50,
        left: 0,
        right: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default ChatTemplaneComponent;