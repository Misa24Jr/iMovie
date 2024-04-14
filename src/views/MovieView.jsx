import React, { useEffect, useState, useRef } from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity, Alert, ScrollView } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { API_ROOT } from "@env";
import { Video } from 'expo-av';
import { Ionicons } from '@expo/vector-icons';

// Components
import { getAndSetToken } from "../utils/tokenHandler.js";
import Genre from '../components/containers/Genre';
import formatMovieDuration from "../helpers/formatMovieDuration.js";
import formatReleaseTime from "../helpers/formatReleaseTime.js";
import parseAudienceScore from "../helpers/parseAudienceScore.js";
import BtnRateThis from "../components/button/BtnRateThis.jsx";
import CriticTitle from "../components/others/CriticTitle.jsx";
import BoxCriticReview from "../components/containers/BoxCriticReview.jsx";
import ModalReview from "../components/containers/ModalRateThis.jsx";

// Imagenes
import pause from '../../assets/pausa.png';
import play from '../../assets/play.png';

const MovieView = (props) =>{
    const videoRef = useRef(null);
    const navigation = useNavigation();
    const movieId = props.route.params.movie.id;

    const [token, setToken] = useState('');
    const [reviewInputValue, setReviewInputValue] = useState('');
    const [movieDetails, setMovieDetails] = useState({});
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [status, setStatus] = useState({shouldPlay: false});

    const toggleModal = () => {
        setIsModalVisible(!isModalVisible);
    };

    const handleClose = async () => {
        try {
            const response = await fetch(`${API_ROOT}/api/reviews/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({movieId, content: reviewInputValue, score: 3, poster: movieDetails.poster_path})
            });

            setIsModalVisible(false);

            if(response.status !== 201) return Alert.alert('Oops', 'Error response from server.');

            return Alert.alert('Great!', 'Yo have published your review.');
        } catch (error) {
            return Alert.alert('Oops', 'Something went wrong trying to publish your review.');
        }
    };

    const getMovieDetails = async () => {
        try {
            const response = await fetch(`${API_ROOT}/api/movies/getDetailsByMovieId`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({movieId})
            });

            if(response.status !== 200) return Alert.alert('Oops', 'Unable to get movie details from server.');

            const data = await response.json();

            return setMovieDetails({
                poster_path: data.movieDetails.poster_path,
                original_title: data.movieDetails.original_title,
                runtime: formatMovieDuration(data.movieDetails.runtime),
                overview: data.movieDetails.overview,
                release_date: formatReleaseTime(data.movieDetails.release_date),
                audience_score: parseAudienceScore(data.movieDetails.audience_score),
                genres: data.movieDetails.genres,
                actors: data.movieDetails.actors,
                director: data.movieDetails.director,
                reviews: data.movieDetails.reviews
            });
        } catch (error) {
            return Alert.alert('Oops', 'Unable to get movie details.');
        }
    }

    useEffect(() => {
        getAndSetToken(setToken);
        getMovieDetails();
    }, []);

    return(
        <ScrollView style={style.scroll}
            contentContainerStyle={{paddingBottom: 20}}
        >
                <View style={style.containerImage}>
                    <Video
                        ref={videoRef}
                        shouldPlay={status.shouldPlay}
                        source={{uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4'}}
                        rate={1.0}
                        volume={1.0}
                        isMuted={false}
                        resizeMode="cover"
                        isLooping
                        style={style.Image}
                        onPlaybackStatusUpdate={status => setStatus(() => status)}
                    />

                    <View style={style.degradado}>
                        <TouchableOpacity
                            onPress={() => status.isPlaying ? videoRef.current.pauseAsync() : videoRef.current.playAsync()}
                            style={style.playButton}
                        >
                            <Text style={style.playText}>
                                {status.isPlaying 
                                ? 
                                <Ionicons name="pause" size={20} color="#FFFFFF" />
                                : 
                                <Ionicons name="play" size={15} color="#FFFFFF" />
                                }
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity
                        style={style.back}
                        onPress={() => navigation.navigate('NewsView')}
                    >
                        <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
                    </TouchableOpacity>

                </View>
                <View style={style.containerBody}>

                    <View>
                        <Text style={style.title}>{movieDetails.original_title}</Text>
                        <Text style={style.subTitle}>{movieDetails.release_date} - {movieDetails.runtime}</Text>
                    </View>

                    <View>
                        <Text style={style.subTitle}>{movieDetails.director} · {movieDetails.actors && movieDetails.actors[0]} · {movieDetails.actors && movieDetails.actors[1]}</Text>
                    </View>

                    <View style={style.containerGenre}>
                        {movieDetails.genres && movieDetails.genres.map((genre, index) => (
                            <Genre key={index} name={genre}/>
                        ))}
                    </View>

                    <View>
                        <Text style={style.desciption}>{movieDetails.overview}</Text>
                    </View>

                    <View style={style.containerPOP}>

                        <View style={style.score}>
                            <Image
                                style={style.tinyLogo}
                                source={require('../../assets/pop.png')}
                            />
                            <Text style={style.scoreText}>{movieDetails.audience_score}</Text>

                            <Text style={style.audience}>Audience Score</Text>
                        </View>

                        <BtnRateThis text={'Rate This'} handleClick={toggleModal}/>
                    </View>
                    
                    <View>
                        <CriticTitle />
                        {movieDetails.reviews === null ? <Text style={{color: 'white', fontSize: 20, fontFamily: 'Jura_400Regular', textAlign: 'center'}}>No reviews yet</Text> : null}
                        {movieDetails.reviews && movieDetails.reviews.map((review, index) => {
                            return <BoxCriticReview key={index} descrip={review.content} user={review.user.nickname} rating={review.score} urlImage={review.user.url_image}/>
                        })}
                    </View>
                </View>
            <ModalReview
                body={{rating: 3, description: reviewInputValue, movieId: movieId, poster: movieDetails.poster_path}}
                handleChangeText={(text) => setReviewInputValue(text)}
                handleClose={handleClose} 
                visible={isModalVisible} 
                toggleModal={toggleModal} 
            />
        </ScrollView>
    )
};

const style = StyleSheet.create({
    scroll:{
        flex: 1,
        backgroundColor: '#151515',
    },
    containerImage:{
        height: 400,
        position: 'relative',
    },
    Image:{
        width: '100%', 
        height: '100%',
    },
    degradado:{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 30, // Altura del degradado que deseas
        backgroundColor: 'rgba(0, 0, 0, 0.8)', 
    },
    containerBody:{
        flex: 1,
        paddingHorizontal: 20,
        gap: 20,
    },
    title:{
        color: 'white',
        fontSize: 30,
        fontFamily: 'Jura_400Regular'
    },
    subTitle:{
        color: '#8a9a9a',
        fontSize: 13,
        fontFamily: 'Jura_Bold700'
    },
    containerGenre:{
        flexDirection: 'row',
        gap: 10,
    },
    desciption:{
        color: 'white',
        fontSize: 20,
        fontFamily: 'Jura_400Regular',
        lineHeight: 28,
        textAlign: 'justify',
    },
    back:{
        position: 'absolute',
        top: 50,
        left: 20,
    },
    playButton:{
        padding: 8,
    },
    playText:{
        color: 'black',
        fontSize: 14,
        fontFamily: 'Jura_400Regular',
    },
    containerPOP:{
        alignItems: 'center',
        justifyContent: 'center',
    },
    score:{
        alignItems: 'center',
        flexDirection: 'row',
        gap: 10,
    },
    scoreText:{
        color: '#8CCECC',
        fontSize: 35,
        fontFamily: 'Jura_400Regular',
        textAlign: 'center',
    },
    audience:{
        color: '#3C5252',
        fontSize: 11,
        fontFamily: 'Jura_400Regular',
        textAlign: 'justify',
        width: 50,
    }
});
export default MovieView;