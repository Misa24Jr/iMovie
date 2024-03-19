import React from "react";
import { useEffect } from "react";
import { Text, StyleSheet } from "react-native";
import * as Font from 'expo-font';

//  Prueba del hook
import useLoadFonts from "../../utils/useLoadFonts";


const Title = () =>{

  const loadFonts = async () => {
    await Font.loadAsync({
      'Jura': require('../../../assets/fonts/Jura.ttf')
    })
  }

  useEffect(() => {
    loadFonts();
  }, []);

  // Para la hook
  // useEffect(() => {
  //   useLoadFonts();
  // },[])


    return(
          <Text style={style.title}>iMovie</Text>
    )
}

const style = StyleSheet.create({
    title: {
      color: '#fff',
      fontSize: 96,
      fontWeight: 'normal',
      fontFamily: 'Jura',
    },
  });

export default Title;
