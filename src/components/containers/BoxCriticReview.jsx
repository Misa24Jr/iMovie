import React from "react";
import { StyleSheet, View, Text, Image } from "react-native";

const BoxCriticReview = ({descrip, user, rating}) => {
    return(
        <>
            <View style={style.container}>
                <View style={style.containerDecrip}>
                    <Text style={style.textDecrip}>{descrip}</Text>
                    <View>
                        <Text style={style.rating}>Rating: {rating}/5</Text>
                    </View>
                </View>

                <View style={style.containerUser}>
                    <Image
                        style={{width: 25, height: 25}}
                        source={{
                            uri: 'https://robohash.org/1',
                        }}
                    />
                    <Text style={style.textUser}>{user}</Text>
                </View>
            </View>
        </>
    )
};

const style = StyleSheet.create({
    container: {
        padding: 10,
        borderRadius: 10,
    },
    containerDecrip: {
        borderColor: '#3C5252',
        borderWidth: 1,
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
    },
    containerUser: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
    },
    textDecrip: {
        color: 'white',
        fontSize: 10,
        fontFamily: 'Jura_400Regular',
    },
    textUser: {
        color: 'white',
        fontSize: 16,
        fontFamily: 'Jura_400Regular',
    },
    rating:{
        paddingTop: 5,
        color: 'gray',
        fontSize: 10,
        fontFamily: 'Jura_400Regular',
        textAlign: 'right',
    }
});

export default BoxCriticReview;