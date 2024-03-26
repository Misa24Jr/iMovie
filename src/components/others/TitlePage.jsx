import React from "react";
import { Image, View, StyleSheet } from "react-native";

const TitlePage = () =>{
  return(
    <View style={style.content}>
      <Image
        source={require('../../../assets/iMovie.png')}
        style={style.title}
      />
    </View>
  )
}

const style = StyleSheet.create({
  title: {
    width: 230,
    height: 65,
    top: 20,
  },
  content:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  }
});

export default TitlePage;