import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
//import { saveToken, getAndSetToken } from "../utils/tokenHandler.js";

// Components
import BtnRegister from "../components/button/BtnRegister";
import Title from "../components/others/Title";
import Input from "../components/inputs/Input";

const RegisterView = () =>{

    const [email, setEmail] = useState('');
    const [nickname, setNickname] = useState('');
    const [password, setPassword] = useState('');
    //const [token, setToken] = useState('');

    const handleRegisterButtonClick = () => {
        console.log('Register button clicked');
        console.log('email: ', email);
        console.log('nickname: ', nickname);
        console.log('password: ', password);
    }

    useEffect(() => {

    });

    return(
        <View style={style.container}>
            <View style={style.containerTitle}>
                <Title/>
            </View>
            <View style={style.containerInput}>
                <Input
                    name={'email'} 
                    placeholder={'ej. example@gmail.com'}
                    changeTextHandler={text => setEmail(text)}
                />
                <Input
                    name={'nickname'} 
                    placeholder={'ej. misa24jr'} 
                    max={10}
                    changeTextHandler={text => setNickname(text)}
                />
                <Input
                    name={'password'}
                    placeholder={'min. 8 characters'}
                    max={8}
                    changeTextHandler={text => setPassword(text)}
                />
            </View>
            <View style={style.containerBtn}>
                <BtnRegister text={'Register'} clickHandler={handleRegisterButtonClick}/>
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
  }
});

export default RegisterView;