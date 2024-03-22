import React from "react";
import { Image, View, StyleSheet } from "react-native";

const Title = () =>{
  return(
    <View>
      <Image
        source={require('../../../assets/iMovie.png')}
        style={style.title}
      />
    </View>
  )
}

const style = StyleSheet.create({
  title: {
    width: 350,
    height: 100,
    // color: '#ffffff',
    // fontSize: 96,
    // fontWeight: '900',
    // fontFamily: 'Jura_Bold700',
  },
});

export default Title;
