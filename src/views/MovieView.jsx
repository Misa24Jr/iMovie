import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity, Alert } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { TMDB_API_ROOT, TMDB_TOKEN, YT_TRAILER_SEARCH_ROOT } from "@env";
import formatTrailerSearch from "../helpers/formatTrailerSearch.js";
import formatMovieDuration from "../helpers/formatMovieDuration.js";
import formatReleaseTime from "../helpers/formatReleaseTime.js";

// Components
import Genre from '../components/containers/Genre';

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
        <View style={style.container}>
            <View style={style.containerImage}>

                <Image
                    style={style.Image}
                    source={{uri: 'https://images.pexels.com/photos/1270184/pexels-photo-1270184.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'}}
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
                    <Text style={style.subTitle}>- {formatMovieDuration(movieDetails.runtime)}
                    </Text>
                </View>

                <View style={style.containerActor}>
                    <Text style={style.subTitle}>Actor 1 - Actor 2 - Actress 1</Text>
                </View>

                <View style={style.containerGenre}>

                    <Genre name="Action" />
                    <Genre name="Horror" />
                    <Genre name="Comedy" />
                    
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
});
export default MovieView;