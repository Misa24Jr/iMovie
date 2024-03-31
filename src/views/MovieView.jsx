import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity, Alert } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { TMDB_API_ROOT, TMDB_TOKEN, X_RAPIDAPI_KEY, RAPIDAPI_ROOT, TMDB_IMAGES_ROOT } from "@env";
import formatTrailerSearch from "../helpers/formatTrailerSearch.js";
import formatMovieDuration from "../helpers/formatMovieDuration.js";
import formatReleaseDate from "../helpers/formatReleaseDate.js";

// Components
import Genre from '../components/containers/Genre';
import {Video} from 'expo-av';

const MovieView = (props) =>{
    const navigation = useNavigation();
    const movieId = props.route.params.movie.id;

    const [movieDetails, setMovieDetails] = useState({});
    const [movieTrailerUri, setMovieTrailerUri] = useState('');

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
            setMovieDetails({
                original_title: data.original_title,
                release_date: formatReleaseDate(data.release_date),
                runtime: formatMovieDuration(data.runtime),
                overview: data.overview,
                genre1: data.genres[0].name,
                genre2: data.genres[1].name,
                genre3: data.genres[2]?.name || '',
                genre4: data.genres[3]?.name || '',
                poster_path: data.poster_path
            });

        } catch (error) {
            return Alert.alert('Oops', error.message);
        }
    }
    
    const getMovieTrailer = async () => {
        const url2 = `https://${RAPIDAPI_ROOT}/search?query=${movieDetails.original_title}+trailer&geo=US&lang=en`;
        const response2 = await fetch(url2, {
            method: 'GET',
            headers: { 'X-RapidAPI-Key': X_RAPIDAPI_KEY, 'X-RapidAPI-Host': RAPIDAPI_ROOT }
        });
        
        if(response2.status !== 200) return Alert.alert('Oops', 'Unable to get movie trailer from server.');
        const data2 = await response2.json();
        console.log(data2.data[0].videoId)
        setMovieTrailerUri(`https://www.youtube.com/watch?v=${data2.data[0].videoId}`);
    }
    
    useEffect(() => {
        getMovieDetails();
    }, []);

    return(
        <View style={style.container}>
            <View style={style.containerImage}>
                <Image
                    style={style.Image}
                    source={{uri: `${TMDB_IMAGES_ROOT}${movieDetails.poster_path}`}}
                />
                <View style={style.degradado}></View>

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

                <View style={style.movieTitle}>
                    <Text style={style.title}>{movieDetails.original_title}</Text>
                    <Text style={style.subTitle}>{movieDetails.release_date} - {movieDetails.runtime}
                    </Text>
                </View>

                <View style={style.containerActor}>
                    <Text style={style.subTitle}>Actor 1 - Actor 2 - Actress 1</Text>
                </View>

                <View style={style.containerGenre}>
                    <Genre name={movieDetails.genre1} />
                    <Genre name={movieDetails.genre2} />
                    {movieDetails.genre3 && <Genre name={movieDetails.genre3} />}
                    {movieDetails.genre4 && <Genre name={movieDetails.genre4} />}
                </View>

                <View style={style.containerDescription}>
                    <Text style={style.desciption}>{movieDetails.overview}</Text>
                </View>
            </View>
        </View>
    )
};

const style = StyleSheet.create({
    container: {
        backgroundColor: '#151515',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    containerImage:{
        width: '100%',
        height: '40%',
        display: 'inline-block', // 'flex
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
        width: '85%',
        height: '60%',
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        flexDirection: 'column',
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
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
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
    play:{
        position: 'absolute',
        top: 50,
        left: 70,
    },
});
export default MovieView;