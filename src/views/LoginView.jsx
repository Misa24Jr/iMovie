import React, { useState, useEffect } from "react";
import { View, StyleSheet, Alert, ActivityIndicator } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { API_ROOT } from "@env";
import { saveToken } from "../utils/tokenHandler.js";
import AsyncStorage from '@react-native-async-storage/async-storage';

// Components
import BtnLogin from "../components/button/BtnLogin";
import Title from "../components/others/Title";
import InitInput from "../components/inputs/InitInput";
import InitLink from "../components/others/InitLink";
import InputValidator from "../utils/inputValidators.js";

const LoginView = () => {
    
    const navigation = useNavigation();
    const [nickname, setNickname] = useState('');
    const [password, setPassword] = useState('');
    const [button, setButton] = useState('gray');
    const [loginBtnDisabled, setLoginBtnDisabled] = useState(true);
    const [loading, setLoading] = useState(false);

    const handleLoginButtonClick = async () => {
        if (!InputValidator.loginInputsValidation(nickname, password)) return;
        setLoading(true);

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

            if (response.status === 400 || !data.token) {
                Alert.alert('Oops', `${data.message?.description || 'Error during login'}, try again.`);
            } else if (response.status === 200) {
                await Promise.all([
                    saveToken(data.token),
                    AsyncStorage.setItem('nickname', data.userData.nickname),
                    AsyncStorage.setItem('email', data.userData.email),
                    AsyncStorage.setItem('url_image', data.userData.url_image)
                ]);
                navigation.navigate('NewsView');
            } else {
                Alert.alert('Oops', 'Unknown error in server, try again later.');
            }
        } catch (error) {
            console.log(error);
            Alert.alert('Error', 'Something went wrong trying to login.');
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        setButton(nickname && password ? '#3C5252' : 'gray');
        setLoginBtnDisabled(!(nickname.length !== 0 && password.length !== 0));
    });

    return (
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
                />
                <InitInput 
                    name={'password'} 
                    placeholder={'min. 8 characters'}
                    max={20}
                    changeTextHandler={text => setPassword(text)}
                    secureEntry={true}
                />
            </View>
            <View style={style.containerBtn}>
                {loading ? (
                    <ActivityIndicator size="large" color="#8CCECC" />
                ) : (
                    <BtnLogin
                        text={'Login'}
                        clickHandler={handleLoginButtonClick}
                        color={button}
                        disabled={loginBtnDisabled}
                    />
                )}
                <InitLink 
                    text={"Don't have an account yet?"} 
                    clickHandler={() => navigation.navigate('RegisterView')}
                />
            </View>
        </View>
    );
}

const style = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#151515',
      alignItems: 'center',
      justifyContent: 'center',
    },
    containerTitle:{
        height: '30%',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    containerInput:{
        height: '50%',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 40,
    },
    containerBtn:{
        height: '20%',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 30,
        marginBottom: '20%',
    }
});

export default LoginView;
