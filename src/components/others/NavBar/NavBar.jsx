import React from "react";
import { View, StyleSheet, Alert } from "react-native";
import BtnNav from "./BtnNav";
import { useNavigation } from '@react-navigation/native';


const NavBar = () => {
    const navigation = useNavigation();
    return (
        <View style={style.containerNavbar}>
            <BtnNav text="F" clickHandler={() => navigation.navigate("Welcome")}/>
            <BtnNav text="S"/>
            <BtnNav text="R"/>
            <BtnNav text="C"/>
            <BtnNav text="U"/>
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
});
export default NavBar;