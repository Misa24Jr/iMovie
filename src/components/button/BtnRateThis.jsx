import React from "react";
import { Text, Image, TouchableOpacity, StyleSheet } from "react-native";

const BtnRateThis = ({text, handleClick}) => {
    return(
        <>
            <TouchableOpacity
                onPress={handleClick}
                style={style.btn}
            >
                <Image
                    style={{width: 30, height: 30}}
                    source={require('../../../assets/tomato.png')}
                />
                <Text style={style.text}>{text}</Text>
            </TouchableOpacity>
        </>
    )
};

const style = StyleSheet.create({
    btn:{
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#3C5252',
        padding: 10,
        borderRadius: 25,
        width: 270,
        height: 50,
        marginTop: 20,
        gap: 20,
        justifyContent: 'center',
    },
    text:{
        color: 'white',
        fontSize: 22,
        fontFamily: 'Jura_400Regular',
    }
});
export default BtnRateThis;