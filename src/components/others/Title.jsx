import React from "react";
import { Text, View, StyleSheet } from "react-native";

const Title = () =>{
  return(
    <Text style={style.title}>iMovie</Text>
  )
}

const style = StyleSheet.create({
  title: {
    color: '#ffffff',
    fontSize: 96,
    fontWeight: '900',
    fontFamily: 'Jura_Bold700',
  },
});

export default Title;
