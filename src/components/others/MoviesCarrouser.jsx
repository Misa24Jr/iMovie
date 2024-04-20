import React, { useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, Image, Dimensions, Animated, Alert, TouchableOpacity } from "react-native";
import { TMDB_API_ROOT, TMDB_TOKEN, TMDB_IMAGES_ROOT } from "@env";
import parseAudienceScore from "../../helpers/parseAudienceScore.js";
import { useNavigation } from '@react-navigation/native';
import Loading from "./Loading.jsx";

const width = Dimensions.get('window').width;

const ANCHO_CONTENEDOR = width * 0.7;
const ESPACIO_LATERAL = (width - ANCHO_CONTENEDOR) / 2;
const ESPACIO = 10;

const MoviesCarrousel = () => {
    const scrollX = useRef(new Animated.Value(0)).current;
    const [newMovies, setNewMovies] = useState([]);
    const [loading, setLoading] = useState(true);

    const getNewMovies = async () => {
        try {
            const response = await fetch(`${TMDB_API_ROOT}/movie/upcoming?language=en-US&page=1`, {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization: `Bearer ${TMDB_TOKEN}`
                }
            });

            if(response.status !== 200) return Alert.alert('Oops', 'Unable to get new movies from server.');
    
            const data = await response.json();
            const newMoviesObject = data.results;
            const updatedMovies = [];
           
            newMoviesObject.forEach((movie) => {
                updatedMovies.push({
                    id: movie.id,
                    title: movie.title,
                    posterPath: `${TMDB_IMAGES_ROOT}${movie.poster_path}`,
                    voteAverage: parseAudienceScore(movie.vote_average)
                });
            });

            return setNewMovies(updatedMovies);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            try{
                await getNewMovies();
                setLoading(false);
            }
            catch(error){
                Alert.alert('Oops', 'Something went wrong trying to get new movies.');
                setLoading(false);
            }
        };
        fetchData();
    }, [])

    const navigation = useNavigation();

    return(
        <Animated.FlatList
            onScroll={Animated.event(
                [{nativeEvent: {contentOffset: {x: scrollX}}}],
                {useNativeDriver: true}
            )}
                data={newMovies}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{paddingTop:200, paddingHorizontal: ESPACIO_LATERAL}}
                decelerationRate={0}
                snapToInterval={ANCHO_CONTENEDOR}
                scrollEventThrottle={16}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({item, index}) =>{
                    const inputRange = [
                        (index - 1) * ANCHO_CONTENEDOR,
                        index * ANCHO_CONTENEDOR,
                        (index + 1) * ANCHO_CONTENEDOR,
                    ];

                    const outputRange = [0, -50, 0];

                    const translateY = scrollX.interpolate({
                        inputRange,
                        outputRange,
                    })

                    return(
                        <TouchableOpacity
                            onPress={() => navigation.navigate('MovieView', { movie: item })}
                        >
                            <View style={style.containerImage}>
                                {loading ? (
                                    <View style={{marginTop: 20}}>
                                        <Loading />
                                    </View>
                                ): (
                                    <Animated.View
                                    style={{
                                        marginHorizontal: ESPACIO,
                                        padding: ESPACIO,
                                        borderRadius: 34,
                                        alignItems: 'center',
                                        transform: [{translateY}],
                                        display: 'flex',
                                        gap: 10,
                                    }}
                                >
                                    <Text style={style.title}>{item.title}</Text>
                                    <Image source={{uri: item.posterPath}} style={style.posterImage}/>
                                    <View>
                                        <View style={style.containerPOP}>
                                            <Image
                                                style={style.tinyLogo}
                                                source={require('../../../assets/pop.png')}
                                            />
                                            <Text style={style.score}>{item.voteAverage}</Text>
                                        </View>
                                        <Text style={{color: "#3C5252", fontFamily: 'Jura_400Regular'}}>Audience Score</Text>
                                    </View>
                                </Animated.View>
                                )}
                            </View>
                        </TouchableOpacity>
                    )
                }}
            />
    )
};

const style = StyleSheet.create({
    containerImage:{
        width: ANCHO_CONTENEDOR,
        top: 40
    },
    posterImage:{
        width: '100%',
        height: ANCHO_CONTENEDOR * 1.2,
        resizeMode: 'cover',
        borderRadius: 24,
        margin: 0,
        marginBottom: 10,
    },
    containerPOP:{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    score:{
        color: '#8CCECC',
        fontSize: 35,
        fontFamily: 'Jura_400Regular'
    },
    hoverStyle: {
        color: '#D0DAD9'
    },
    title:{
        color: 'white',
        fontSize: 28,
        fontFamily: 'Jura_400Regular'
    },
    tinyLogo: {
        width: 40,
        height: 40,
      },
})

export default MoviesCarrousel;