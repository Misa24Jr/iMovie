import React from "react";
import { Text, View, StyleSheet } from "react-native";

// Components
import BtnRegister from "../components/button/BtnRegister";
import BtnLogin from "../components/button/BtnLogin";
import Title from "../components/others/Title";
import { useNavigation } from "@react-navigation/native";
import LinearGradient from 'react-native-linear-gradient';

const Welcome = () =>{
    const navigation = useNavigation();

    return(
        <View style={style.container}>
            <View style={style.containerTitle}>
                <Title/>
                <Text style={style.subTitle}>Get Started!</Text>  
            </View>
            <View style={style.containerBtn}>
                <BtnLogin
                    text={'Login'}
                    clickHandler={() => navigation.navigate('LoginView')}
                    color={'#8CCECC'}
                />
                <BtnRegister
                    text={'Register'}
                    clickHandler={() => navigation.navigate('RegisterView')}
                    color={'#3C5252'}
                />
            </View>
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
    linearGradient: {
        flex: 1,
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 5
      },
    containerTitle:{
        width: '100%',
        height: '60%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        gap: 20,
    },
    containerBtn:{
        width: '100%',
        height: '40%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        gap: 20,
    },
    subTitle:{
        color: '#fff',
        fontSize: 40,
        fontFamily: 'Jura_400Regular'
    },
  });

export default Welcome;