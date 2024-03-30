import React from "react";
import { StyleSheet, View } from "react-native";

// Components
import HomeTemplateComponent from "../components/containers/HomeTemplaneComponent";
import MyReviewTitle from "../components/others/MyReviewTitle";
import MyReviewBox from "../components/containers/MyReviewBox";

const rating = 5;
const description = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam impedit iste ea id et vel commodi, quod fuga perferendis, culpa beatae, velit ex. Sapiente in deleniti quod repellat? Quidem, culpa?';

const MyReviewView = () => {
    return(
        <View style={style.container}>
            <HomeTemplateComponent />
            <View style={style.containerBody}>
                <MyReviewTitle />
                <MyReviewBox url={'img'} description={description} rating={rating}/>
            </View>
        </View>
    )
};

const style = StyleSheet.create({
    container: {
        backgroundColor: '#151515',
        height: '100%',
        alignItems: 'center',
    },
    containerBody: {
        top: 135,
        width: '80%',
    },
});

export default MyReviewView;