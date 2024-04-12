import React, { useState, useEffect } from "react";
import { StyleSheet, View, Alert, ScrollView, Text } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

import { API_ROOT } from "@env";

// Components
import HomeTemplateComponent from "../components/containers/HomeTemplaneComponent";
import MyReviewTitle from "../components/others/MyReviewTitle";
import MyReviewBox from "../components/containers/MyReviewBox";
import { getAndSetToken } from "../utils/tokenHandler.js";
import ModalPop from "../components/containers/ModalPop";

const MyReviewView = () => {
    const [token, setToken] = useState('');
    const [myReviews, setMyReviews] = useState([]);

    const getMyReviews = async () => {
        try {
            const userToken = await AsyncStorage.getItem('token');
            const response = await fetch(`${API_ROOT}/api/reviews/getAllByUserId`, {
                method: 'GET',
                headers: { 'Authorization': `Bearer ${userToken}` }
            });

            if(response.status !== 200) return Alert.alert('Oops', 'Error response from server.');

            const reviews = await response.json();
            return setMyReviews(reviews);
        } catch (error) {
            return Alert.alert('Oops', 'Something went wrong trying to get your reviews.');
        }
    }

    useEffect(() => {
        getAndSetToken(setToken);
        getMyReviews();
    }, []);

    return(
        <View style={style.container}>
            <HomeTemplateComponent />
            <View style={style.containerBody}>
                <MyReviewTitle />
                <ScrollView 
                contentContainerStyle={{paddingBottom: 20}}
                style={style.scroll}
                >
                    {myReviews.length === 0 ? <Text style={{ color: '#667e7e', fontSize: 20, fontFamily: 'Jura_400Regular', textAlign: 'center'}}>You haven't published any review yet...</Text> : null}
                    {myReviews.map((review, index) => <MyReviewBox key={index} poster={review.poster} description={review.content} rating={review.score} />)}
                </ScrollView>
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
    scroll: {
        height: '60%',
        display: 'flex',
        gap: 20,
        // backgroundColor: 'gray'
    }
});

export default MyReviewView;