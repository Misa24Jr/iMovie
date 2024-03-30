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
import InputValidator from "../utils/inputValidators.js";

const LoginView = () =>{
    
    const navigation = useNavigation();

    const [nickname, setNickname] = useState('');
    const [password, setPassword] = useState('');
    const [button, setButton] = useState('gray');
    const [loginBtnDisabled, setLoginBtnDisabled] = useState(true);
    
    const handleLoginButtonClick = async () => {
        if (!InputValidator.loginInputsValidation(nickname, password)) return;

        try {
            const response = await fetch(`${API_ROOT}/api/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    nickname: nickname,
                    password: password
                })
            });

            const data = await response.json();

            if(response.status === 400) return Alert.alert('Oops', `${data.message}, try again.`);
            if(response.status !== 200 && response.status !== 400) return Alert.alert('Oops', 'Unknown error in server, try again later.');
            if(!data.token) return Alert.alert('Oops', 'Unable to get session token from server.');

            await saveToken(data.token);

            return navigation.navigate('NewsView');
        } catch (error) {
            console.log(error);
            return Alert.alert('Error', 'Something went wrong trying to login.');
        }
    }
    // return navigation.navigate('NewsView');
// }

    useEffect(() => {
        if(nickname && password) setButton('#3C5252');
        else setButton('gray');

        if(nickname.length !== 0 && password.length !== 0) setLoginBtnDisabled(false);
        else setLoginBtnDisabled(true);
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
                    max={20}
                    changeTextHandler={text => setNickname(text)}
                    secureEntry={false}
                    parentSetterFunction={setNickname}
                />
                <InitInput 
                    name={'password'} 
                    placeholder={'min. 8 characters'}
                    max={20}
                    changeTextHandler={text => setPassword(text)}
                    secureEntry={true}
                    parentSetterFunction={setPassword}
                />
            </View>
            <View style={style.containerBtn}>
                <BtnLogin
                    text={'Login'}
                    clickHandler={handleLoginButtonClick}
                    color={button}
                    disabled={loginBtnDisabled}
                />
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