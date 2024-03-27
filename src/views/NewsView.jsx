import React, { useEffect, useRef} from "react";
import { 
    View, 
    Text, 
    StyleSheet, 
    FlatList, 
    Image, 
    Dimensions, 
    Animated,
    Alert
} from "react-native";
import { TMDB_API_ROOT, TMDB_TOKEN, TMDB_IMAGES_ROOT } from "@env";
// Components 
import TitlePage from "../components/others/TitlePage";

const width = Dimensions.get('window').width;
// const height = Dimensions.get('window').height;

const ANCHO_CONTENEDOR = width * 0.7;
const ESPACIO_LATERAL = (width - ANCHO_CONTENEDOR) / 2;
const ESPACIO = 10;

const NewsView = () => {
    const scrollX = useRef(new Animated.Value(0)).current;
    const newMoviesTitles = [];
    const newMoviesPosterPath = [];

    const getNewMovies = async () => {
        try {
            const response = await fetch(`${TMDB_API_ROOT}/movie/upcoming?language=en-US&page=1`, {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization: `Bearer ${TMDB_TOKEN}`
                }
            });

            console.log(response);
            if(response.status !== 200) return Alert.alert('Oops', 'Unable to get new movies from server.');
    
            const data = await response.json();
            const newMovies = data.results;
           
            newMovies.map((movie) => {
                newMoviesTitles.push(movie.title);
                newMoviesPosterPath.push(`${TMDB_IMAGES_ROOT}${movie.poster_path}`);
            });

            return;
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getNewMovies();
    }, [])

    return(
        <View style={style.container}>
            <TitlePage />
            <Animated.FlatList
            onScroll={Animated.event(
                [{nativeEvent: {contentOffset: {x: scrollX}}}],
                {useNativeDriver: true}
            )}
                data={newMoviesPosterPath}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{paddingTop:200, paddingHorizontal: ESPACIO_LATERAL}}
                decelerationRate={0}
                snapToInterval={ANCHO_CONTENEDOR}
                scrollEventThrottle={16}
                keyExtractor={(item) => item}
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
                        <View style={style.containerImage}>
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
                                <Text style={style.title}>Titulo</Text>
                                <Image source={{uri: item}} style={style.posterImage}/>
                                <View style={style.containerPOP}>
                                    <Image
                                        source={require('../../assets/pop.png')}
                                        style={{width: 40, height: 40}}
                                    />
                                    <Text style={style.points}>50%</Text>
                                </View>
                            </Animated.View>
                        </View>
                    )
                }}
            />
        </View>
    )
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#151515',
        alignItems: 'center',
        justifyContent: 'center',
    },
    containerImage:{
        width: ANCHO_CONTENEDOR,
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
    points:{
        color: 'white',
        fontSize: 35,
        fontFamily: 'Jura_400Regular'
    }, 
    title:{
        color: 'white',
        fontSize: 24,
        fontFamily: 'Jura_400Regular'
    }
});

export default NewsView;
