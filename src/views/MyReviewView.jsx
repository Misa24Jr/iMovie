import React from "react";
import { StyleSheet, View } from "react-native";

// Components
import HomeTemplateComponent from "../components/containers/HomeTemplaneComponent";

const MyReviewView = () => {
    return(
        <View style={style.container}>
            <HomeTemplateComponent />
        </View>
    )
};

const style = StyleSheet.create({
    container: {
        backgroundColor: '#151515',
        height: '100%',
    },
});

export default MyReviewView;