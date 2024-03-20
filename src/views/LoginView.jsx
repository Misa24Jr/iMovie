import React, { useState, useEffect } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { API_ROOT } from "@env";
import { saveToken } from "../utils/tokenHandler.js";

// Components
import BtnLogin from "../components/button/BtnLogin";
import Title from "../components/others/Title";
import InitInput from "../components/inputs/InitInput";
import InitLink from "../components/others/InitLink";

const LoginView = () =>{
    
    const navigation = useNavigation();
    const [nickname, setNickname] = useState('');
    const [password, setPassword] = useState('');
    const [button, setButton] = useState('gray');

    const handleLoginButtonClick = async () => {
        try {
            const response = await fetch(`${API_ROOT}/api/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    nickname: nickname,
                    password: password
                })
            });

            if(response.status !== 200) return Alert.alert('Oops', 'Error in server, try again later.');

            const data = await response.json();

            if(!data.token) return Alert.alert('Oops', 'Unable to get session token from server.');

            await saveToken(data.token);

            return console.log('Login successfully');
        } catch (error) {
            console.log(error);
            return Alert.alert('Error', 'Something went wrong trying to login.');
        }
    }

    useEffect(() => {
        if(nickname && password) setButton('#8CCECC');
        else setButton('gray');
      
    }, [nickname, password]);

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
                    secureEntry={false}
                />
                <InitInput 
                    name={'password'} 
                    placeholder={'min. 8 characters'}
                    max={8}
                    changeTextHandler={text => setPassword(text)}
                    secureEntry={true}
                />
            </View>
            <View style={style.containerBtn}>
                <BtnLogin text={'Login'} clickHandler={handleLoginButtonClick} color={button}/>
                <InitLink 
                    text={"Don't have an acount yet?"} 
                    clickHandler={() => navigation.navigate('RegisterView')}
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
        marginBottom: '20%',
    }
  });
  
export default LoginView;