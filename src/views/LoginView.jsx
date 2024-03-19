import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { useNavigation } from '@react-navigation/native';
//import { saveToken, getAndSetToken } from "../utils/tokenHandler.js";

// Components
import BtnLogin from "../components/button/BtnLogin";
import Title from "../components/others/Title";
import InitInput from "../components/inputs/InitInput";
import InitLink from "../components/others/InitLink";

const LoginView = () =>{
    
    const navigation = useNavigation();
    const [nickname, setNickname] = useState('');
    const [password, setPassword] = useState('');
    //const [token, setToken] = useState('');

    const handleLoginButtonClick = () => {
        console.log('Login button clicked');
        console.log('nickname: ', nickname);
        console.log('password: ', password);
    }

    const handleLink = () => {navigation.navigate('RegisterView')};

    useEffect(() => {

    });

    return(
        <View style={style.container}> 
            <View style={style.containerTitle}>
                <Title/>
            </View>
            <View style={style.containerInput}>
                <InitInput
                    name={'nickname'}
                    placeholder={'ej. misa24jr'}
                    max={10}
                    changeTextHandler={text => setNickname(text)}
                />
                <InitInput 
                    name={'password'} 
                    placeholder={'min. 8 characters'}
                    max={8}
                    changeTextHandler={text => setPassword(text)}
                />
            </View>
            <View style={style.containerBtn}>
                <BtnLogin text={'Login'} clickHandler={handleLoginButtonClick}/>
                <InitLink text={"Don't have an acount yet?"} clickHandler={handleLink}/>
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
        gap: 40,
    },
    containerBtn:{
        width: '100%',
        height: '20%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 30,
    }
  });
  
export default LoginView;