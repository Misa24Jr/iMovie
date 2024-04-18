import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";

const BoxMovie = ({ poster, title, rating, year, actors }) => {
    return(
        <View style={style.container}>
            <View style={style.containerImage}>
                <Image
                    style={{width: 80, height: 100, borderRadius: 10, margin: 10}}
                    source={{
                        uri: poster,
                    }}
                />
            </View>
            
            <View style={style.containerDescrip}>
                    <Text style={style.title}>{title}</Text>
                    <Text style={style.text}>{year}</Text>
                    <Text style={style.text}>{actors}</Text>
                    <View style={style.containerRating}>
                        <Image
                            source={require('../../../assets/pop.png')}
                            style={{width: 25, height: 25}}
                        />
                        <Text style={style.rating}>{rating}</Text>
                        <Text style={style.textRating}>Audience Score</Text>
                    </View>
            </View>
        </View>
    )
};

const style = StyleSheet.create({
    container:{
        marginTop: 15,
        borderWidth: 1,
        borderColor: '#fff',
        borderTopWidth: 0,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        flexDirection: 'row',
        alignItems: 'center',

    },
    containerImage:{
        width: '30%',
        paddingRight: 10,
    },
    containerDescrip:{
        width: '70%',
        gap: 5,
    },
    title:{
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
        fontFamily: 'Jura_400Regular',
    },
    text:{
        fontSize: 13,
        color: '#fff',
        fontFamily: 'Jura_400Regular',
    },
    containerRating:{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
        alignItems: 'center',
    },
    rating:{
        color: '#8CCECC',
        fontFamily: 'Jura_400Regular',
        fontSize: 20,
    },
    textRating:{
        color: '#3C5252',
        fontFamily: 'Jura_400Regular',
    },
})

export default BoxMovie;