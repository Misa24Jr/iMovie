import React, { useEffect, useState, useRef } from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity, Alert, ScrollView } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { TMDB_API_ROOT, TMDB_TOKEN, YT_TRAILER_SEARCH_ROOT } from "@env";
import formatTrailerSearch from "../helpers/formatTrailerSearch.js";
import formatMovieDuration from "../helpers/formatMovieDuration.js";
import formatReleaseTime from "../helpers/formatReleaseTime.js";

// Components
import Genre from '../components/containers/Genre';
import {Video} from 'expo-av';

const MovieView = (props) =>{
    const navigation = useNavigation();
    const movieId = props.route.params.movie.id;

    const [movieDetails, setMovieDetails] = useState({});
    const [movieTrailerUri, setMovieTrailerUri] = useState('');

    const videoRef = useRef(null);
    const [status, setStatus] = useState({});

    const getMovieDetails = async () => {
        try {
            const url = `${TMDB_API_ROOT}/movie/${movieId}?language=en-US`;
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization: `Bearer ${TMDB_TOKEN}`
                }
            });

            if(response.status !== 200) return Alert.alert('Oops', 'Unable to get movie details from server.');
            const data = await response.json();
            setMovieDetails(data);
            await getMovieTrailer();
        } catch (error) {
            return Alert.alert('Oops', 'Unable to get movie details.');
        }
    }

    const getMovieTrailer = async () => {
        try {
            const url = `${YT_TRAILER_SEARCH_ROOT}${formatTrailerSearch(movieDetails.original_title)}`;
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    accept: 'application/json'
                }
            });

            if(response.status !== 200) return Alert.alert('Oops', 'Unable to get movie trailer from server.');

            const data = await response.json();
            const movieTrailerId = (data.items[0].id.videoId);

            setMovieTrailerUri(`https://www.youtube.com/watch?v=${movieTrailerId}`);
            return console.log(movieTrailerUri);
        } catch (error) {
            return Alert.alert('Oops', 'Unable to get movie trailer.');
        }
    }

    useEffect(() => {
        getMovieDetails();
    }, []);

    return(
        <ScrollView style={style.scroll}
            contentContainerStyle={{paddingBottom: 20}}
        >
                <View style={style.containerImage}>
                    <Video
                        ref={videoRef}
                        source={{uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4'}}
                        rate={1.0}
                        volume={1.0}
                        isMuted={false}
                        resizeMode="cover"
                        shouldPlay
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
                                {status.isPlaying ? 'Pause' : 'Play'}
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity
                        style={style.back}
                        onPress={() => navigation.navigate('NewsView')}
                    >
                        <Image
                        style={{width: 30, height: 30}}
                        source={require('../../assets/back.png')}
                        />
                    </TouchableOpacity>

                </View>
                <View style={style.containerBody}>

                    <View>
                        <Text style={style.title}>{movieDetails.original_title}</Text>
                        <Text style={style.subTitle}>- {formatMovieDuration(movieDetails.runtime)}</Text>
                    </View>

                    <View>
                        <Text style={style.subTitle}>Actor 1 - Actor 2 - Actress 1</Text>
                    </View>

                    <View style={style.containerGenre}>

                        <Genre name="Action" />
                        <Genre name="Horror" />
                        <Genre name="Comedy" />
                        
                    </View>

                    <View>
                        <Text style={style.desciption}>{movieDetails.overview}</Text>
                        <Text style={style.desciption}>{movieDetails.overview}</Text>
                        <Text style={style.desciption}>{movieDetails.overview}</Text>
                    </View>
                </View>
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
        color: 'white',
        fontSize: 13,
        fontFamily: 'Jura_400Regular'
    },
    containerGenre:{
        flexDirection: 'row',
        gap: 10,
    },
    desciption:{
        color: 'white',
        fontSize: 20,
        fontFamily: 'Jura_400Regular',
        textAlign: 'justify',
    },
    back:{
        position: 'absolute',
        top: 50,
        left: 20,
    },
    playButton:{
        // position: 'absolute',
        // top: '50%',
        // left: '50%',
        // transform: [{ translateX: -25 }, { translateY: -25 }],
        // zIndex: 1, 
        borderRadius: 50,
        backgroundColor: 'white',
        padding: 5,
        width: 50,
    },
    playText:{
        color: 'black',
        fontSize: 14,
        textAlign: 'center',
        fontFamily: 'Jura_400Regular',
    },

});
export default MovieView;