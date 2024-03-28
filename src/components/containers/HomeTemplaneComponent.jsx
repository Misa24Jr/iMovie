import React from "react";
import { View, Text, StyleSheet } from "react-native";

// Components
import TitlePage from "../others/TitlePage";
import NavBar from "../others/NavBar/NavBar";

const HomeTemplateComponent = () => {
    return (
        <>
            <View style={style.containerTitle}>
                <TitlePage/>
            </View>

            <View style={style.containerNav}>
                <NavBar/>
            </View>
        </>
    );
};

const style = StyleSheet.create({
    containerTitle: {
        position: 'absolute',
        top: 50,
        left: 0,
        right: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        // Agrega otros estilos según tus necesidades
    },
    containerNav: {
        position: 'absolute',
        bottom: 100,
        left: 0,
        right: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        // Agrega otros estilos según tus necesidades
    }
});

export default HomeTemplateComponent;
