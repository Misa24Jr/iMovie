import React from "react";
import { View, StyleSheet } from "react-native";


// Components
import BtnRegister from "../components/button/BtnRegister";
import Title from "../components/others/Title";
import InitInput from "../components/inputs/InitInput";
import LinkRegister from "../components/others/LinkRegister";

const RegisterView = () =>{

    return(
      <View style={style.container}>
          
          <View style={style.containerTitle}>
              <Title/>
          </View>

          <View style={style.containerInput}>
              <InitInput name={'email'} placeholder={'ej. example@gmail.com'}/>
              <InitInput name={'nickname'} placeholder={'ej. misa24jr'} max={10}/>
              <InitInput name={'password'} placeholder={'min. 8 characters'} max={8}/>
          </View>

          <View style={style.containerBtn}>
              <BtnRegister text={'Register'}/>
              <LinkRegister text={'Already have an account?'}/>
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
      height: '30%',
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'center',
  },
  containerInput:{
      width: '100%',
      height: '50%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      marginTop: 30,
      gap: 30,
  },
  containerBtn:{
      width: '100%',
      height: '20%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: 20,
  }
});

export default RegisterView;