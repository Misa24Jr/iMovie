import React, { useState, useEffect } from "react";
import { View, StyleSheet, Alert, ActivityIndicator } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { API_ROOT } from "@env";

// Components
import BtnRegister from "../components/button/BtnRegister";
import Title from "../components/others/Title";
import InitInput from "../components/inputs/InitInput";
import InitLink from "../components/others/InitLink";
import InputValidator from "../utils/inputValidators.js";

const RegisterView = () =>{

    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [nickname, setNickname] = useState('');
    const [password, setPassword] = useState('');
    const [button, setButton] = useState('gray');
    const [registerBtnDisabled, setRegisterBtnDisabled] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    const handleRegisterButtonClick = async () => { 
        if (!InputValidator.registerInputsValidation(email, nickname, password)) return;

        setIsLoading(true);

        try {
            const response = await fetch(`${API_ROOT}/api/auth/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: email,
                    nickname: nickname,
                    password: password
                })
            });

            if(response.status === 400) {
                const data = await response.json();
                Alert.alert('Oops', `${data.message}, try again.`);
            } else if (response.status === 201) {
                Alert.alert('Success', 'You have been registered successfully.');
                navigation.navigate('LoginView');
            } else {
                Alert.alert('Oops', 'Unknown error in server, try again later.');
            }
        } catch (error) {
            Alert.alert('Error', 'Something went wrong trying to register.');
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        if(email && nickname && password) setButton('#3C5252');
        else setButton('gray');

        if(email.length !== 0 && nickname.length !== 0 && password.length !== 0) {
            setRegisterBtnDisabled(false);
        } else {
            setRegisterBtnDisabled(true);
        }
    });

    return(
        <View style={style.container}>
            <View style={style.containerTitle}>
                <Title/>
            </View>
            <View style={style.containerInput}>
                <InitInput
                    name={'email'} 
                    placeholder={'ej. example@gmail.com'}
                    changeTextHandler={text => setEmail(text)}
                    secureEntry={false}
                    parentSetterFunction={setEmail}
                />
                <InitInput
                    name={'nickname'} 
                    placeholder={'ej. misa24jr'} 
                    max={10}
                    changeTextHandler={text => setNickname(text)}
                    secureEntry={false}
                    parentSetterFunction={setNickname}
                />
                <InitInput
                    name={'password'}
                    placeholder={'min. 8 characters'}
                    changeTextHandler={text => setPassword(text)}
                    secureEntry={true}
                    parentSetterFunction={setPassword}
                />
            </View>
            <View style={style.containerBtn}>
                {isLoading ? (
                    <ActivityIndicator size="large" color="#8CCECC" />
                ) : (
                    <BtnRegister
                        text={'Register'}
                        clickHandler={handleRegisterButtonClick}
                        color={button}
                        disabled={registerBtnDisabled}
                    />
                )}
                <InitLink 
                    text={"Already have an account?"} 
                    clickHandler={() => navigation.navigate('LoginView')}
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
      height: '30%',
      justifyContent: 'flex-end',
      alignItems: 'center',
  },
  containerInput:{
      height: '50%',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 30,
      gap: 30,
  },
  containerBtn:{
      height: '20%',
      justifyContent: 'center',
      alignItems: 'center',
      gap: 30,
      marginBottom: '20%',
  }
});

export default RegisterView;
