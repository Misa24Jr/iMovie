import React from "react";
import { Text, View, StyleSheet } from "react-native";
import LinearGradient from 'react-native-linear-gradient';

// Components
import BtnRegister from "../components/button/BtnRegister";
import BtnLogin from "../components/button/BtnLogin";


const Welcome = () =>{
    
    return(
        <View style={style.container}>

            <View style={style.containerTitle}>

                <Text style={style.title}>iMovie</Text>
                <Text style={style.subTitle}>Get Started!</Text>
                
            </View>

            <View style={style.containerBtn}>
                <BtnLogin text={'Login'}/>
                <BtnRegister text={'Register'}/>
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
    title: {
      color: '#fff',
      fontSize: 96,
      fontWeight: 'normal',
    },
    subTitle:{
        color: '#fff',
        fontSize: 40,
    },
  });

export default Welcome;