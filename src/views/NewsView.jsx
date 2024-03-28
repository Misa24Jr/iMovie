import React from "react";
import { View, StyleSheet } from "react-native";

//Components
import HomeTemplateComponent from "../components/containers/HomeTemplaneComponent";
import MoviesCarrousel from "../components/others/MoviesCarrouser";

const NewsView = () => {
    return(
        <View style={style.container}>
            <HomeTemplateComponent />
            <MoviesCarrousel />
        </View>
    )
}

const style = StyleSheet.create({
    container: {
        backgroundColor: '#151515',
        height: '100%',
    },
});

export default NewsView;
