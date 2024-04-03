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
import BtnRateThis from "../components/button/BtnRateThis.jsx";
import CriticTitle from "../components/others/CriticTitle.jsx";
import BoxCriticReview from "../components/containers/BoxCriticReview.jsx";

// Imagenes
import pause from '../../assets/pausa.png';
import play from '../../assets/play.png';

const MovieView = (props) =>{
    const navigation = useNavigation();
    const movieId = props.route.params.movie.id;

    const [movieDetails, setMovieDetails] = useState({});
    const [movieTrailerUri, setMovieTrailerUri] = useState('');

    const videoRef = useRef(null);
    const [status, setStatus] = useState({shouldPlay: false});

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
                                ? <Image
                                    style={{width: 20, height: 20}}
                                    source={pause}
                                /> 
                                : <Image
                                    style={{width: 20, height: 20}}
                                    source={play}
                                /> 
                                }
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
                    </View>

                    <View style={style.containerPOP}>

                        <View style={style.score}>
                            <Image
                                style={style.tinyLogo}
                                source={require('../../assets/pop.png')}
                            />
                            <Text style={style.scoreText}>50%</Text>

                            <Text style={style.audience}>Audience Score</Text>
                        </View>

                        <BtnRateThis text={'Rate This'}/>
                    </View>
                    
                    <View>
                        <CriticTitle />
                        <BoxCriticReview descrip={'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi.'} user={'misa24jr'} rating={5}/>
                        <BoxCriticReview descrip={'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi.'} user={'josemmr11'} rating={5}/>
                        <BoxCriticReview descrip={'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi.'} user={'adri_10'} rating={5}/>
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
        // alignItems: 'center',
        // borderRadius: 50,
        // backgroundColor: 'white',
        padding: 8,
        // width: 50,
    },
    playText:{
        color: 'black',
        fontSize: 14,
        textAlign: 'center',
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