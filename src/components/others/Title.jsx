import React from "react";
import { Text, StyleSheet } from "react-native";

const Title = () =>{

    return(
          <Text style={style.title}>iMovie</Text>
    )
}

const style = StyleSheet.create({
    title: {
      color: '#fff',
      fontSize: 96,
      fontWeight: 'normal',
    },
  });

export default Title;
