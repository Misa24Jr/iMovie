import React from "react";
import { View, StyleSheet, TouchableOpacity, Image, Alert } from "react-native";
import { useNavigation } from '@react-navigation/native';


const NavBar = () => {
    const navigation = useNavigation();
    return (
        <View style={style.containerNavbar}>
            <TouchableOpacity
                style={style.btn}
            >
                <Image
                    source={require('../../../../assets/flash.png')}
                    style={{width: 30, height: 30}}
                />
            </TouchableOpacity>

            <TouchableOpacity
                style={style.btn}
            >
                <Image
                    source={require('../../../../assets/search.png')}
                    style={{width: 30, height: 30}}
                />
            </TouchableOpacity>

            <TouchableOpacity
                style={style.btn}
            >
                <Image
                    source={require('../../../../assets/review.png')}
                    style={{width: 30, height: 30}}
                />
            </TouchableOpacity>

            <TouchableOpacity
                style={style.btn}
            >
                <Image
                    source={require('../../../../assets/chat.png')}
                    style={{width: 30, height: 30}}
                />
            </TouchableOpacity>

            <TouchableOpacity
                style={style.btn}
            >
                <Image
                    source={require('../../../../assets/user.png')}
                    style={{width: 30, height: 30}}
                />
            </TouchableOpacity>
            
        </View>
    );
};

const style = StyleSheet.create({
    containerNavbar:{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        width: 250,
        height: 50,
        gap: 15,
    },
    btn:{
        ouline: 0,
        border: 0,
        width: 50,
        height: 50,
        borderRadius: "50%",
        backgroundColor: 'gray',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        transition: "all ease-in-out 0.3s",
        cursor: 'pointer',
    }
});
export default NavBar;