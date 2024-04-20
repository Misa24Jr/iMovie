import React, { useState, useEffect } from "react";
import { StyleSheet, View, Alert, ScrollView, Text } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_ROOT } from "@env";

// Components
import HomeTemplateComponent from "../components/containers/HomeTemplaneComponent";
import MyReviewTitle from "../components/others/MyReviewTitle";
import MyReviewBox from "../components/containers/MyReviewBox";
import Loading from "../components/others/Loading.jsx";

const MyReviewView = () => {
    const [myReviews, setMyReviews] = useState([]);
    const [loading, setLoading] = useState(true);

    const getMyReviews = async () => {
        try {
            setLoading(true);
            const userToken = await AsyncStorage.getItem('token');
            const response = await fetch(`${API_ROOT}/api/reviews/getAllByUserId`, {
                method: 'GET',
                headers: { 'Authorization': `Bearer ${userToken}` }
            });

            if(response.status === 404) return setLoading(false);

            if(response.status !== 200 ) {
                setLoading(false);
                return Alert.alert('Oops', 'Error server trying to get your reviews.');
            }

            const reviews = await response.json();
            setMyReviews(reviews);
            return setLoading(false);
        } catch (error) {
            setLoading(false);
            return Alert.alert('Oops', 'Something went wrong trying to get your reviews.');
        }
    }

    useEffect(() => {
        getMyReviews();
    }, []);

    return(
        <View style={style.container}>
            <HomeTemplateComponent />
            <View style={style.containerBody}>
                <MyReviewTitle />
                {loading ? (
                    <View style={style.loadingContainer}>
                        <Loading />
                    </View>
                ) : (
                    <ScrollView 
                        contentContainerStyle={{paddingBottom: 20}}
                        style={style.scroll}
                    >
                        {myReviews.length === 0 ? (
                            <Text style={style.noReviewsText}>You haven't published any review yet...</Text>
                        ) : null}
                        {myReviews.map((review, index) => (
                            <MyReviewBox 
                                key={index} 
                                movieId={review.movie.movieId} 
                                poster={review.poster} 
                                description={review.content} 
                                rating={review.score} 
                            />
                        ))}
                    </ScrollView>
                )}
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
    },
    loadingContainer: {
        marginTop: 20,
    },
    noReviewsText: {
        color: '#43bebe',
        fontSize: 20,
        fontFamily: 'Jura_400Regular',
        textAlign: 'center',
        top: 240,
        opacity: 0.2,
    }
});

export default MyReviewView;
