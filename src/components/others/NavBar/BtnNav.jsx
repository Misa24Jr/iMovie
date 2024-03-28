import React from "react";
import { Image, TouchableOpacity, StyleSheet } from "react-native";

const BtnNav = ({ img, clickHandler}) =>{
    return(
        <TouchableOpacity
            onPress={clickHandler}
            style={style.btn}
            >
            <Image
                source={require({img})}
            />
        </TouchableOpacity>
    )
}

const style = StyleSheet.create({
    text:{
        color: 'black',
        textAlign: 'center',
        fontSize: 20,
        fontFamily: 'Jura_400Regular'
    },
    btn:{
        ouline: 0,
        border: 0,
        width: 50,
        height: 50,
        borderRadius: "50%",
        backgroundColor: 'white',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        transition: "all ease-in-out 0.3s",
        cursor: 'pointer',
    }
})
export default BtnNav;