import React from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';

// Components
import Genre from '../components/containers/Genre';

const MovieView = () =>{
    const navigation = useNavigation();
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
                    <Text style={style.title}>Movie Title</Text>
                    <Text style={style.subTitle}>2024 - 02h 12m</Text>
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
                    <Text style={style.desciption}>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem illum facilis necessitatibus, illo ipsum ad aspernatur fuga debitis enim aperiam magni consequatur possimus, doloribus dolor repudiandae excepturi cumque doloremque eveniet?
                    </Text>
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